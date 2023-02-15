import { registerAs } from '@nestjs/config';

export default registerAs('throttler', () => ({
  ttl: Number(process.env.THROTTLE_TTL) || 10,
  limit: Number(process.env.THROTTLE_LIMIT) || 3,
}));
