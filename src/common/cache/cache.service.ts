import {
  type CacheModuleOptions,
  type CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore as store } from 'cache-manager-redis-yet';

@Injectable()
export class CacheService implements CacheOptionsFactory {
  constructor(private configService: ConfigService) {}

  createCacheOptions(): CacheModuleOptions {
    const url = this.configService.get<string>('redis.url');
    const ttl = this.configService.get<number>('cache.ttl');

    return {
      ttl,
      ...(url !== undefined && { store, url }),
    };
  }
}
