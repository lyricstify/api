import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import ConfigEnvironment from '../common/config/config.env';

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
  REDIS_PORT: number;

  @IsString()
  @IsOptional()
  REDIS_PASSWORD: string;

  @IsNumber()
  @IsOptional()
  REDIS_TTL: number;
}
