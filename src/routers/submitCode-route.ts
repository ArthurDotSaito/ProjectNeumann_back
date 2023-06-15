import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { authenticateToken } from '@/middlewares/authentication-middleware';
import { submitCodeSchema } from '@/schemas';

const submitCodeRoute = Router();

submitCodeRoute.all('./', authenticateToken);
submitCodeRoute.post('/submit', validateBody(submitCodeSchema));

export { submitCodeRoute };
