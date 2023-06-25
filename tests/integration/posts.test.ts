import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';

import { cleanDb, generateValidToken } from '../helpers';
import { createUser } from '../factories';
import getSortedPostsDataHelper from '../post.helpers';
import { createPostFromDataFactory } from '../factories/posts-factories';
import app, { init } from '@/app';

beforeAll(async () => {
	await init();
});

beforeEach(async () => {
	await cleanDb();
});

const server = supertest(app);

describe('GET All /posts', () => {
	describe('When token is invalid or there is no session', () => {
		it('should respond with status 401 if no token is given', async () => {
			const response = await server.get('/posts');

			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
		});

		it('should respond with status 401 if given token is not valid', async () => {
			const token = faker.lorem.word();

			const response = await server.get('/posts').set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
		});

		it('should respond with status 401 if there is no session for given token', async () => {
			const userWithoutSession = await createUser();
			const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

			const response = await server.get('/posts').set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
		});
	});
	describe('When token is valid', () => {
		it('Should return all posts', async () => {
			const user = await createUser();
			const token = await generateValidToken();
			const sortedPosts = await getSortedPostsDataHelper();
			const allPost = await createPostFromDataFactory(sortedPosts);

			const response = await server.get('/posts').set('Authorization', `Bearer ${token}`);

			expect(response.status).toEqual(httpStatus.OK);
		});
	});
});
