import { NextFunction, Response } from 'express';

import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares/authentication-middleware';
import postsServices from '@/services/posts-services';

export async function getAllPosts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	try {
		await postsServices.createPostFromData();
		const postFromDatabase = await postsServices.getAllPosts();

		return res.status(201).send(postFromDatabase);
	} catch (error) {
		next(error);
	}
}

export async function getPostById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	const { postId } = req.params;
	try {
		const post = await postsServices.getPostById(parseInt(postId));

		return res.status(httpStatus.OK).send(post);
	} catch (error) {
		next(error);
	}
}
