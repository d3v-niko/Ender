import Redis from 'ioredis';

// Create a singleton Redis client to be reused across the application.
// The connection URL should be provided via the REDIS_URL environment variable.
// For local development, default to localhost.
const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

export const redisClient = new Redis(redisUrl);

// Optionally handle connection errors gracefully.
redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});
