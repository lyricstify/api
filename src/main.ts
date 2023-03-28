import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import ConfigEnvironment from './common/config/config.env';

const createSwaggerDocument = ({
  app,
  port,
}: {
  app: NestExpressApplication;
  port: number;
}) => {
  const config = new DocumentBuilder()
    .setTitle('Lyricstify API')
    .setDescription('Discover time-synced Spotify song lyrics.')
    .setExternalDoc('GitHub Repository', 'https://github.com/lyricstify/api')
    .setVersion('1.0')
    .addServer(
      'https://api.lyricstify.vercel.app/',
      'Production server Lyricstify API.',
    )
    .addServer(
      `http://localhost:${port}`,
      'Local server Lyricstify API for development.',
    )
    .addTag('lyrics')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey, methodKey) => methodKey,
  };

  return SwaggerModule.createDocument(app, config, options);
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.register(),
    {
      cors: true,
    },
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') || 3000;
  const env = configService.get<`${ConfigEnvironment}`>('app.env');

  app.use(helmet());
  app.enableVersioning({ type: VersioningType.URI });

  if (env === 'development') {
    SwaggerModule.setup('docs', app, createSwaggerDocument({ app, port }));
  }

  await app.listen(port);
}
bootstrap();
