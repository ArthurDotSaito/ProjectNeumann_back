import { prisma } from '@/config';

async function createPostFromData(sortedPostsData: BlogPost[]) {
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
}

const postsRepository = {
	createPostFromData,
};

export default postsRepository;
