import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import userService from '@/services/user-services';

export async function createUser(req: Request, res: Response, next: NextFunction) {
	const { email, username, password } = req.body;

	try {
		const user = await userService.createUser({ email, username, password });
		return res.status(httpStatus.CREATED).json({
			id: user.id,
			username: user.username,
			email: user.email,
		});
	} catch (error) {
		if (error.name === 'DuplicatedEmailError') return res.status(httpStatus.CONFLICT).send(error);

		return res.status(httpStatus.BAD_REQUEST).send(error);
	}
}
