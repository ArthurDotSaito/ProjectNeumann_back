import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas/authentication-schema';

const authenticationRouter = Router();
authenticationRouter.post('/sign-in', validateBody(signInSchema));

export { authenticationRouter };
