import { createClient } from 'redis';

const redis = createClient({
	url: 'redis://redis:6379',
});

redis.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => await redis.connect();
connectRedis();

export { redis };
