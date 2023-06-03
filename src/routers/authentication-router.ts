import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas';
import { singInPost } from '@/controller';

const authenticationRouter = Router();
authenticationRouter.post('/', validateBody(signInSchema), singInPost);

export { authenticationRouter };
