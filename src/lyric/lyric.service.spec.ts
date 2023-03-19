import { HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { AxiosError } from 'axios';
import { Observable, of } from 'rxjs';
import { createAxiosResponse } from '../../test/utils/axios';
import { createTrackEntity } from '../../test/utils/lyric';
import { createTokenEntity } from '../../test/utils/token';
import { TokenService } from '../token/token.service';
import { LyricService } from './lyric.service';

describe('LyricService', () => {
  let lyricService: LyricService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LyricService],
    })
      .useMocker((token) => {
        if (token === TokenService) {
          return {
            findOneOrCreate: jest.fn(
              () => new Promise((resolve) => resolve(createTokenEntity())),
            ),
          };
        }

        if (token === HttpService) {
          return { get: jest.fn() };
        }
      })
      .compile();

    lyricService = module.get<LyricService>(LyricService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('findOne', () => {
    it('should be able to get lyrics by track id', async () => {
      const data = createTrackEntity();

      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(createAxiosResponse({ data })));

      expect(await lyricService.findOne('')).toEqual(data);
    });

    it('should be able to catch axios error and throw it as http response', async () => {
      jest.spyOn(httpService, 'get').mockImplementation(
        () =>
          new Observable((subscriber) => {
            subscriber.error(new AxiosError());
          }),
      );

      await expect(lyricService.findOne('')).rejects.toThrow(HttpException);
    });
  });
});
