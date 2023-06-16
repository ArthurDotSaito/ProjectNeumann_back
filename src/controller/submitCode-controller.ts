import { NextFunction, Response } from 'express';

import { AuthenticatedRequest } from '@/middlewares/authentication-middleware';
import { SubmitCodeData } from '@/protocols';
import submitServices from '@/services/submit-services';

export async function submitCode(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	const codeSubmission = req.body as SubmitCodeData;
	try {
		const compileResponse = await submitServices.compileCode(codeSubmission);
		const token = compileResponse.token;
		await submitServices.checkSubmitTokenStatus(token);
	} catch (error) {
		next(error);
	}
}
