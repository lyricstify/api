import { HttpService } from '@nestjs/axios';
import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, type TestingModule } from '@nestjs/testing';
import { AxiosError } from 'axios';
import { Cache } from 'cache-manager';
import { Observable, of } from 'rxjs';
import { createAxiosResponse } from '../../test/utils/axios';
import { createTokenEntity } from '../../test/utils/token';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let tokenService: TokenService;
  let httpService: HttpService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService],
    })
      .useMocker((token) => {
        if (token === ConfigService) {
          return { get: jest.fn() };
        }

        if (token === HttpService) {
          return { get: jest.fn() };
        }

        if (token === CACHE_MANAGER) {
          return { set: jest.fn(), get: jest.fn() };
        }
      })
      .compile();

    tokenService = module.get<TokenService>(TokenService);
    httpService = module.get<HttpService>(HttpService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  describe('create', () => {
    it('should be able to generate token', async () => {
      const data = createTokenEntity();

      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(createAxiosResponse({ data })));

      expect(await tokenService.create()).toEqual(data);
    });

    it('should be able to throw an internal server error if the provided spotify token is anonymous', async () => {
      const data = createTokenEntity({ isAnonymous: true });

      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(createAxiosResponse({ data })));

      await expect(tokenService.create()).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should be able to catch axios error and throw it as http response', async () => {
      jest.spyOn(httpService, 'get').mockImplementation(
        () =>
          new Observable((subscriber) => {
            subscriber.error(
              new AxiosError(
                undefined,
                undefined,
                undefined,
                undefined,
                createAxiosResponse({
                  statusCode: HttpStatus.NOT_FOUND,
                  statusText: 'Not Found',
                }),
              ),
            );
          }),
      );

      await expect(tokenService.create()).rejects.toThrow(HttpException);
    });
  });

  describe('findOneOrCreate', () => {
    it('should be able to retrieve the cached token if available', async () => {
      const data = createTokenEntity();

      jest.spyOn(cacheManager, 'get').mockResolvedValue(data);

      expect(await tokenService.findOneOrCreate()).toEqual(data);
    });

    it('should be able to store the token to cache', async () => {
      const data = createTokenEntity();
      const setCacheSpy = jest.spyOn(cacheManager, 'set');

      jest.spyOn(tokenService, 'create').mockResolvedValue(data);

      expect(await tokenService.findOneOrCreate()).toEqual(data);
      expect(setCacheSpy).toHaveBeenCalled();
    });
  });
});
