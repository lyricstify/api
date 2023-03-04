import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST || undefined,
  port: Number(process.env.REDIS_PORT) || undefined,
  password: process.env.REDIS_PASSWORD || undefined,
  ttl: Number(process.env.REDIS_TTL) || 5,
}));
