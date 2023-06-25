import { forBiddenError } from '@/errors/forbidden-error';
import commentsRepository from '@/repositories/comments-repository';

async function getAllCommentsFromPost(postId: number) {
	if (!postId) throw forBiddenError();

	const comments = await commentsRepository.getAllCommentsFromPost(postId);
	const sortedComments = comments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

	return sortedComments;
}

async function postComment(content: string, postId: number, userId: number) {
	if (!postId) throw forBiddenError();
	if (!userId) throw forBiddenError();

	const comment = await commentsRepository.postComment(content, postId, userId);

	return comment;
}

const commentsServices = {
	getAllCommentsFromPost,
	postComment,
};

export default commentsServices;
