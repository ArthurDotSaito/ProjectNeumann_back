import { Router } from 'express';
import { authenticateToken } from '@/middlewares/authentication-middleware';
import { getAllPosts, getPostById } from '@/controller/posts-controller';

const postsRouter = Router();

postsRouter.all('/*', authenticateToken);
postsRouter.get('/', getAllPosts);
postsRouter.get('/:postId', getPostById);

export { postsRouter };
