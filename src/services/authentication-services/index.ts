import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GetUserOrFailResult } from '@/protocols';
import userRepository from '@/repositories/user-repository';
import { invalidCredentialsError } from '@/errors';
import sessionRepository from '@/repositories/session-repository';
import { SignInParams } from '@/protocols';
import { SignInResult } from '@/protocols';

async function signIn(params: SignInParams): Promise<SignInResult> {
	const { email, password } = params;

	const user = await getUserOrFail(email);

	await validatePasswordOrFail(password, user.password);

	const token = await createSession(user.id);

	return {
		user: exclude(user, 'password'),
		token,
	};
}
async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
	const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
	if (!user) throw invalidCredentialsError();

	return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
	const isPasswordValid = await bcrypt.compare(password, userPassword);
	if (!isPasswordValid) throw invalidCredentialsError();
}

async function createSession(userId: number) {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET);
	await sessionRepository.createSession({
		token,
		userId,
	});

	return token;
}

const authenticationService = {
	signIn,
};

export default authenticationService;
