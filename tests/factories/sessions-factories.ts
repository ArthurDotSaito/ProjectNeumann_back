import { Session } from '@prisma/client';
import { createUser } from './users-factories';
import { prisma } from '@/config';

export async function createSession(token: string): Promise<Session> {
	const user = await createUser();

	return prisma.session.create({
		data: {
			token: token,
			userId: user.id,
		},
	});
}
