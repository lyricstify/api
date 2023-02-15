import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  ttl: Number(process.env.CACHE_TTL) || 86400000,
}));
