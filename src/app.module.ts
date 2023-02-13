import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { configValidate } from './config/config.validate';
import { LyricModule } from './lyric/lyric.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig], validate: configValidate }),
    LyricModule,
    TokenModule,
  ],
})
export class AppModule {}
