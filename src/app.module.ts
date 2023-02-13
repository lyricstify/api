import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { configValidate } from './config/config.validate';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig], validate: configValidate }),
  ],
})
export class AppModule {}
