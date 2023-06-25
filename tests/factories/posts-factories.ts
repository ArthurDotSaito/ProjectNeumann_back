import { faker } from '@faker-js/faker';
import { prisma } from '@/config';
import { BlogPost } from '@/types';

export async function createPostFromDataFactory(sortedPostsData: BlogPost[]) {
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

	return result;
}
