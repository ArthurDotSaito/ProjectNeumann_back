import { notFoundError } from '@/errors/notFound-error';
import commentsRepository from '@/repositories/comments-repository';

async function getAllCommentsFromPost(postId: number) {
	if (!postId) throw notFoundError();

	const comments = await commentsRepository.getAllCommentsFromPost(postId);

	return comments;
}

const commentsServices = {
	getAllCommentsFromPost,
};

export default commentsServices;
