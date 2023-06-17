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

		res.status(201).send(compileResponse);
	} catch (err) {
		const error = err.response ? err.response.data : err;
		const status = err.response.status;
		if (status === 429) return res.status(429).json({ message: 'Too Many Requests' });
	}
}
