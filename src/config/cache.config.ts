import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  redisUrl: process.env.REDIS_URL,
  ttl: Number(process.env.CACHE_TTL) || 86400000,
}));
