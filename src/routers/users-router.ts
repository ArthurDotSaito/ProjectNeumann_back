import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { createUserSchema } from '@/schemas';

const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema));

export { usersRouter };
