import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import ConfigEnvironment from './config.env';

export default class ConfigRule {
  @IsEnum(ConfigEnvironment)
  @IsOptional()
  APP_ENV: string;

  @IsNumber()
  @IsOptional()
  APP_PORT: number;

  @IsString()
  @IsNotEmpty()
  SPOTIFY_COOKIE: string;

  @IsString()
  @IsOptional()
  REDIS_URL: string;

  @IsNumber()
  @IsOptional()
  CACHE_TTL: number;

  @IsNumber()
  @IsOptional()
  THROTTLE_TTL: number;

  @IsNumber()
  @IsOptional()
  THROTTLE_LIMIT: number;
}
