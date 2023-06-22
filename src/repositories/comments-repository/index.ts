import { prisma } from '@/config';

async function getAllCommentsFromPost(commentId: number) {
	return prisma.comment.findMany({
		where: {
			id: commentId,
		},
	});
}

const commentsRepository = {
	getAllCommentsFromPost,
};

export default commentsRepository;
