import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { authenticateToken } from '@/middlewares/authentication-middleware';
import { submitCodeSchema } from '@/schemas';
import { submitCode } from '@/controller/submitCode-controller';

const submitCodeRoute = Router();

submitCodeRoute.all('/*', authenticateToken);
submitCodeRoute.post('/', validateBody(submitCodeSchema), submitCode);

export { submitCodeRoute };
