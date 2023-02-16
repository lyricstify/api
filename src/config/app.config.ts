import { registerAs } from '@nestjs/config';
import ConfigEnvironment from '../common/config/config.env';

export default registerAs('app', () => ({
  env: process.env.APP_ENV || ConfigEnvironment.Development,
  port: Number(process.env.APP_PORT) || 3000,
  spotifyCookie: process.env.SPOTIFY_COOKIE,
}));
