import { User } from '@prisma/client';

export type ApplicationError = {
	name: string;
	message: string;
};

export type CreateUserParams = Pick<User, 'email' | 'password'>;

export type SignInParams = Pick<User, 'email' | 'password'>;
