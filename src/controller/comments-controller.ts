import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares/authentication-middleware';
import commentsServices from '@/services/comments-service';

export async function getAllCommentsFromPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	try {
		const { postId } = req.params;
		const comments = await commentsServices.getAllCommentsFromPost(parseInt(postId));

		return res.status(httpStatus.OK).send(comments);
	} catch (error) {
		next(error);
	}
}

export async function postComment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	try {
		const { postId } = req.params;
		const content = req.body.content as string;
		const { userId } = req;

		const comment = await commentsServices.postComment(content, parseInt(postId), userId);

		return res.status(httpStatus.CREATED).send(comment);
	} catch (error) {
		next(error);
	}
}
