import { redis } from '@/config';

afterAll(async () => {
	await redis.disconnect();
});
