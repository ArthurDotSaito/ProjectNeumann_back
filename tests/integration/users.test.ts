import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createUser } from '../factories';
import { cleanDb } from '../helpers';
import { duplicatedEmailError } from '@/errors';
import { prisma } from '@/config';
import app, { init } from '@/app';

beforeAll(async () => {
	await init();
	await cleanDb();
});

const server = supertest(app);

describe('POST /sign-up', () => {
	it('should respond with status 400 when body is not given', async () => {
		const response = await server.post('/sign-up');

		expect(response.status).toBe(httpStatus.BAD_REQUEST);
	});

	it('should respond with status 400 when body is not valid', async () => {
		const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

		const response = await server.post('/sign-up').send(invalidBody);

		expect(response.status).toBe(httpStatus.BAD_REQUEST);
	});

	describe('when body is valid', () => {
		const generateValidBody = () => ({
			email: faker.internet.email(),
			username: faker.internet.userName(),
			password: faker.internet.password(6),
		});

		it('should respond with status 409 when there is an user with given email', async () => {
			const body = generateValidBody();
			await createUser(body);

			const response = await server.post('/sign-up').send(body);

			expect(response.status).toBe(httpStatus.CONFLICT);
			expect(response.body).toEqual(duplicatedEmailError());
		});

		it('should respond with status 201 and create user when given email is unique', async () => {
			const body = generateValidBody();

			const response = await server.post('/sign-up').send(body);

			expect(response.status).toBe(httpStatus.CREATED);
			expect(response.body).toEqual({
				id: expect.any(Number),
				username: body.username,
				email: body.email,
			});
		});

		it('should not return user password on body', async () => {
			const body = generateValidBody();

			const response = await server.post('/sign-up').send(body);

			expect(response.body).not.toHaveProperty('password');
		});

		it('should save user on db', async () => {
			const body = generateValidBody();

			const response = await server.post('/sign-up').send(body);

			const user = await prisma.user.findUnique({
				where: { email: body.email },
			});
			expect(user).toEqual(
				expect.objectContaining({
					id: response.body.id,
					username: response.body.username,
					email: body.email,
				}),
			);
		});
	});
});
