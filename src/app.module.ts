import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { configValidate } from './config/config.validate';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig], validate: configValidate }),
    TokenModule,
  ],
})
export class AppModule {}
