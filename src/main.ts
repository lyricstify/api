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
    const document = SwaggerModule.createDocument(app, config, options);

    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(port);
}
bootstrap();
