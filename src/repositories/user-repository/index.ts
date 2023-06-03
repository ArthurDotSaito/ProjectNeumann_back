import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function createUser(data: Prisma.UserUncheckedCreateInput) {
	return prisma.user.create({
		data,
	});
}

async function findByEmail(email: string, select?: Prisma.UserSelect) {
	const params: Prisma.UserFindUniqueArgs = {
		where: {
			email,
		},
	};

	if (select) {
		params.select = select;
	}

	return prisma.user.findUnique(params);
}
const userRepository = {
	createUser,
	findByEmail,
};

export default userRepository;
