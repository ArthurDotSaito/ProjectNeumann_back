import { Router } from 'express';
import { authenticateToken } from '@/middlewares/authentication-middleware';
import { getAllCommentsFromPost, postComment } from '@/controller/comments-controller';

const commentsRouter = Router();

commentsRouter.all('/*', authenticateToken);
commentsRouter.get('/:postId', getAllCommentsFromPost);
commentsRouter.post('/:postId', postComment);

export { commentsRouter };
