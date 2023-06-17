import { Router } from 'express';
import { authenticateToken } from '@/middlewares/authentication-middleware';

const postsRouter = Router();

postsRouter.all('/*', authenticateToken);
postsRouter.get('/');

export { postsRouter };
