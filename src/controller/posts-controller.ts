import { NextFunction, Response } from 'express';

import { AuthenticatedRequest } from '@/middlewares/authentication-middleware';
import postsServices from '@/services/posts-services';

export async function getAllPosts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	try {
		await postsServices.createPostFromData();

		const postFromDatabase = await postsServices.getAllPosts();

		return res.status(500).send(postFromDatabase);
	} catch (error) {
		next(error);
	}
}
