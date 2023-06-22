import { prisma } from '@/config';

async function getAllCommentsFromPost(postId: number) {
	return prisma.comment.findMany({
		where: {
			postId: postId,
		},
		include: {
			author: {
				select: {
					username: true,
				},
			},
		},
	});
}

const commentsRepository = {
	getAllCommentsFromPost,
};

export default commentsRepository;
