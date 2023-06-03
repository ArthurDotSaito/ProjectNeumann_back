import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';
import { prisma } from '@/config';

export async function cleanDb() {
	await prisma.session.deleteMany({});
	await prisma.user.deleteMany({});
}
