import { User } from '@prisma/client';

export type ApplicationError = {
	name: string;
	message: string;
};

export type CreateUserParams = Pick<User, 'email' | 'password'>;

export type SignInParams = Pick<User, 'email' | 'password'>;

export type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

export type SignInResult = { user: Pick<User, 'id' | 'email'>; token: string };
