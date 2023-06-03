import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { createUserSchema } from '@/schemas';
import { createUser } from '@/controller';

const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema), createUser);

export { usersRouter };
