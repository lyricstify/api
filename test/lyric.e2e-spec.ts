import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { createAxiosResponse } from './utils/axios';
import { createTokenEntity } from './utils/token';
import { createTrackEntity } from './utils/lyric';
import type { TokenEntity } from '../src/token/entities/token.entity';
import { TrackEntity } from '../src/lyric/entities/track.entity';
import { LineEntity } from '../src/lyric/entities/line.entity';
import { LyricEntity } from '../src/lyric/entities/lyric.entity';
import { instanceToPlain } from 'class-transformer';

describe('LyricController (e2e)', () => {
  let app: INestApplication;
  const token: TokenEntity = createTokenEntity();
  const track: TrackEntity = createTrackEntity();
  const httpService = {
    get: jest.fn((url: string) => {
      if (url === '/get_access_token') {
        return of(createAxiosResponse({ data: token }));
      }

      if (url.match(/^\/color\-lyrics\/v2\/track\/(.)/)?.length !== undefined) {
        return of(createAxiosResponse({ data: track }));
      }
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule.register('.env.testing')],
    })
      .overrideProvider(HttpService)
      .useValue(httpService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET /v1/lyrics/:id', () => {
    const data = new TrackEntity({
      ...track,
      lyrics: new LyricEntity({
        ...track.lyrics,
        lines: track.lyrics.lines.map((line) => new LineEntity(line)),
      }),
    });

    return request(app.getHttpServer())
      .get('/lyrics/test')
      .expect(HttpStatus.OK)
      .expect(instanceToPlain(data));
  });

  afterAll(async () => {
    await app.close();
  });
});
