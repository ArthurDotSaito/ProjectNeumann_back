import { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { invalidDataError } from '@/errors';

export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
	return validate(schema, 'body');
}

function validate(schema: ObjectSchema, type: 'body' | 'params') {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req[type], {
			abortEarly: false,
		});

		if (!error) {
			next();
		} else {
			res.status(httpStatus.BAD_REQUEST).send(invalidDataError(error.details.map((d) => d.message)));
		}
	};
}

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;
