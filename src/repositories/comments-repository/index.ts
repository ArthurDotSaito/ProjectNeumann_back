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

async function postComment(content: string, postId: number, userId: number) {
	return prisma.comment.create({
		data: {
			content,
			postId,
			userId,
		},
	});
}

const commentsRepository = {
	getAllCommentsFromPost,
	postComment,
};

export default commentsRepository;
