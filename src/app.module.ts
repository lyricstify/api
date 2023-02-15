import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { configValidate } from './config/config.validate';
import { LyricModule } from './lyric/lyric.module';
import { TokenModule } from './token/token.module';
import cacheConfig from './config/cache.config';
import { CacheService } from './common/cache/cache.service';
import redisConfig from './config/redis.config';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, cacheConfig, redisConfig],
      validate: configValidate,
    }),
    LyricModule,
    TokenModule,
  ],
})
export class AppModule {}
