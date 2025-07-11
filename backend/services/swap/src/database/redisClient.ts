// redisClient.ts

import { createClient, RedisClientType } from 'redis';
import logger from "../utils/logger";

// Initialize Redis client
const redisClient: RedisClientType = createClient({
    socket: {
        host: 'redis',
        port: 6379,
    },
});

// Set up event listeners once
redisClient.on('connect', () => logger.user.info('Redis client connected.'));
redisClient.on('ready', () => logger.user.info('Redis client is ready.'));
redisClient.on('error', (err:any) => logger.user.error(`Redis Client Error: ${err}`));
redisClient.on('end', () => logger.user.info('Redis client disconnected.'));

// Immediately connect to Redis within an async function
(async () => {
    try {
        await redisClient.connect();
        logger.user.info('Redis connected successfully.');
    } catch (err) {
        logger.user.error(`Failed to connect to Redis: ${err}`);
        process.exit(1);
    }
})();

export default redisClient;