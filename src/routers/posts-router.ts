import { Router } from 'express';
import { authenticateToken } from '@/middlewares/authentication-middleware';
import { getAllPosts } from '@/controller/posts-controller';

const postsRouter = Router();

postsRouter.all('/*', authenticateToken);
postsRouter.get('/', getAllPosts);

export { postsRouter };
