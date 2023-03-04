import { CacheModule, DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { configValidate } from './common/config/config.validate';
import { LyricModule } from './lyric/lyric.module';
import { TokenModule } from './token/token.module';
import { CacheService } from './common/cache/cache.service';
import redisConfig from './config/redis.config';
import ConfigRule from './config/config.rule';

@Module({})
export class AppModule {
  static register(envFilePath: string | string[] = '.env'): DynamicModule {
    return {
      module: AppModule,
      imports: [
        CacheModule.registerAsync({
          isGlobal: true,
          useClass: CacheService,
        }),
        ConfigModule.forRoot({
          envFilePath,
          isGlobal: true,
          load: [appConfig, redisConfig],
          validate: configValidate(ConfigRule),
        }),
        LyricModule,
        TokenModule,
      ],
    };
  }
}
