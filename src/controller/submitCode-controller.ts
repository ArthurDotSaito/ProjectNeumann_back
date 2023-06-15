import { Response } from 'express';

import { AuthenticatedRequest } from '@/middlewares/authentication-middleware';

export default function submitCode(req: AuthenticatedRequest, res: Response): any {
	return null;
}
