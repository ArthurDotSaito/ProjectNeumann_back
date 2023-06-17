import { prisma, redis } from '@/config';

async function getCachedPosts(cacheKey: string) {
	const cachePosts = await redis.get(cacheKey);
	if (cachePosts) {
		const posts = JSON.parse(cachePosts);
		return posts;
	}
	return null;
}

async function createPostFromData(sortedPostsData: BlogPost[]) {
	const cachedPostsFromDataKey = 'postsFromData';
	const cachedPostsFromData = await getCachedPosts(cachedPostsFromDataKey);

	if (cachedPostsFromData) return cachedPostsFromData;

	const createPostPromises = sortedPostsData.map(async (postData) => {
		await prisma.post.create({
			data: {
				title: postData.title,
				content: postData.formattedContent,
				date: new Date(postData.date),
			},
		});
	});

	await Promise.all(createPostPromises);

	const posts = sortedPostsData.map((postData) => ({
		title: postData.title,
		content: postData.formattedContent,
		date: new Date(postData.date),
	}));

	await redis.set(cachedPostsFromDataKey, JSON.stringify(posts));

	return posts;
}

async function getAllPosts() {
	const cachedPostsKey = 'posts';
	const cachedPosts = await getCachedPosts(cachedPostsKey);
	if (cachedPosts) return cachedPosts;

	const posts = await prisma.post.findMany();

	await redis.set(cachedPostsKey, JSON.stringify(posts));

	return posts;
}

const postsRepository = {
	createPostFromData,
	getAllPosts,
};

export default postsRepository;
