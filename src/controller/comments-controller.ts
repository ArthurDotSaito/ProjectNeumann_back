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
