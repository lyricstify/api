import {
  type CacheModuleOptions,
  type CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';

@Injectable()
export class CacheService implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createCacheOptions(): Promise<CacheModuleOptions> {
    const ttl = this.configService.get<number>('redis.ttl');
    const host = this.configService.get<string>('redis.host');
    const port = this.configService.get<number>('redis.port');
    const password = this.configService.get<string>('redis.password');

    if (host !== undefined && port !== undefined) {
      return {
        store: await redisStore({
          host,
          port,
          password,
          ttl,
          tls: {},
        }),
      };
    }

    return {};
  }
}
