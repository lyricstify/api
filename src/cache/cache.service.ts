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
    const url = this.configService.get<string>('cache.redisUrl');

    return url !== undefined ? { store, url, ttl: 0 } : {};
  }
}
