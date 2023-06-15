import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { authenticateToken } from '@/middlewares/authentication-middleware';

const submitCodeRoute = Router();

submitCodeRoute.all('./', authenticateToken);
submitCodeRoute.post('/submit');

export { submitCodeRoute };
