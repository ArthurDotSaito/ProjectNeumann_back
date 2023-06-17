import { NextFunction, Response } from 'express';

import { AuthenticatedRequest } from '@/middlewares/authentication-middleware';
import postsServices from '@/services/posts-services';

export default function getAllPosts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try{
        await postsServices.createPostFromData()
    }
}
