import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') || 3000;

  app.use(helmet());
  app.use(compression());
  app.enableVersioning({ type: VersioningType.URI });

  await app.listen(port);
}
bootstrap();
