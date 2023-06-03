import userRepository from '@/repositories/user-repository';

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
	const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
	if (!user) throw invalidCredentialsError();

	return user;
}
