import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  ThrottlerOptionsFactory,
  ThrottlerModuleOptions,
} from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

@Injectable()
export class ThrottlerService implements ThrottlerOptionsFactory {
  constructor(private configService: ConfigService) {}

  createThrottlerOptions(): ThrottlerModuleOptions {
    const url = this.configService.get<string>('redis.url');
    const ttl = this.configService.get<number>('throttler.ttl');
    const limit = this.configService.get<number>('throttler.limit');

    return {
      ttl,
      limit,
      ...(url !== undefined && {
        storage: new ThrottlerStorageRedisService(url),
      }),
    };
  }
}
