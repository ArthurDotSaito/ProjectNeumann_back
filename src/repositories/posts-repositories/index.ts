import { prisma, redis } from '@/config';
import { BlogPost } from '@/types';

async function getCachedPosts(cacheKey: string) {
	const cachePosts = await redis.get(cacheKey);
	if (cachePosts) {
		const posts = JSON.parse(cachePosts);
		return posts;
	}
	return null;
}

async function updateCachedPosts() {
	const cachedPostsKey = 'posts';
	const posts = await prisma.post.findMany();

	await redis.set(cachedPostsKey, JSON.stringify(posts));
}

async function createPostFromData(sortedPostsData: BlogPost[]) {
	const createPostPromises = sortedPostsData.map((postData) => {
		return prisma.post.upsert({
			where: {
				title: postData.title,
			},
			update: {
				content: postData.formattedContent,
				date: new Date(postData.date),
			},
			create: {
				title: postData.title,
				content: postData.formattedContent,
				date: new Date(postData.date),
			},
		});
	});

	const result = await Promise.allSettled(createPostPromises);
	await updateCachedPosts();

	return result;
}

async function getAllPosts() {
	const cachedPostsKey = 'posts';
	const cachedPosts = await getCachedPosts(cachedPostsKey);
	if (cachedPosts) return cachedPosts;

	const posts = await prisma.post.findMany();

	await redis.set(cachedPostsKey, JSON.stringify(posts));

	return posts;
}

async function getPostById(postId: number) {
	return prisma.post.findFirst({
		where: {
			id: postId,
		},
	});
}

const postsRepository = {
	createPostFromData,
	getAllPosts,
	getPostById,
};

export default postsRepository;
