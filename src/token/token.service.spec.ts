import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, type TestingModule } from '@nestjs/testing';
import { AxiosError } from 'axios';
import { Observable, of } from 'rxjs';
import { createAxiosResponse } from '../../test/utils/axios';
import { createTokenEntity } from '../../test/utils/token';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let tokenService: TokenService;
  let httpService: HttpService;

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
      })
      .compile();

    tokenService = module.get<TokenService>(TokenService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('get', () => {
    it('should be able to generate token', async () => {
      const data = createTokenEntity();

      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(createAxiosResponse({ data })));

      expect(await tokenService.get()).toEqual(data);
    });

    it('should be able to throw an internal server error if the provided spotify token is anonymous', async () => {
      const data = createTokenEntity({ isAnonymous: true });

      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(createAxiosResponse({ data })));

      await expect(tokenService.get()).rejects.toThrow(
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

      await expect(tokenService.get()).rejects.toThrow(
        new HttpException('Not Found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
