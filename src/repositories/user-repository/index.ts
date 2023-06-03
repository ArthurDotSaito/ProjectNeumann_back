import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function createUser(data: Prisma.UserUncheckedCreateInput) {
	return prisma.user.create({
		data,
	});
}

const userRepository = {
	createUser,
};

export default userRepository;
