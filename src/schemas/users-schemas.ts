import Joi from 'joi';
import { CreateUserParams } from '@/protocols';

export const createUserSchema = Joi.object<CreateUserParams>({
	email: Joi.string().email().required(),
	username: Joi.string().required(),
	password: Joi.string().min(6).required(),
});
