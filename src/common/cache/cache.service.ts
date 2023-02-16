import {
  type CacheModuleOptions,
  type CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import type { RedisClientOptions } from 'redis';
import ConfigEnvironment from '../config/config.env';

@Injectable()
export class CacheService implements CacheOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createCacheOptions(): Promise<CacheModuleOptions<RedisClientOptions>> {
    const env = this.configService.get<`${ConfigEnvironment}`>('app.env');
    const url = this.configService.get<string>('redis.url');
    const ttl = this.configService.get<number>('cache.ttl');

    return {
      ttl,
      ...(url !== undefined && env !== 'testing'
        ? {
            store: redisStore,
            url,
            pingInterval: 4 * 60 * 1000,
          }
        : {}),
    };
  }
}
