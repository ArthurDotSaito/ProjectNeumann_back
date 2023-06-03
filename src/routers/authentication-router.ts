import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas/authentication-schema';
import { singInPost } from '@/controller';

const authenticationRouter = Router();
authenticationRouter.post('/sign-in', validateBody(signInSchema), singInPost);

export { authenticationRouter };
