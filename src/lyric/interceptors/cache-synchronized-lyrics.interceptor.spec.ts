import { CACHE_MANAGER, ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom, of } from 'rxjs';
import { createTrackEntity } from '../../../test/utils/lyric';
import { CacheSynchronizedLyricsInterceptor } from './cache-synchronized-lyrics.interceptor';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Cache } from 'cache-manager';

describe('CacheSynchronizedLyricsInterceptor', () => {
  let cacheService: Cache;
  let context: ExecutionContext;
  let cacheSynchronizedLyricsInterceptor: CacheSynchronizedLyricsInterceptor;

  const key = 'testPath';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheSynchronizedLyricsInterceptor],
    })
      .useMocker((token) => {
        if (token === CACHE_MANAGER) {
          return { set: jest.fn(), get: jest.fn() };
        }
      })
      .compile();

    context = new ExecutionContextHost([]);
    cacheService = module.get<Cache>(CACHE_MANAGER);
    cacheSynchronizedLyricsInterceptor =
      module.get<CacheSynchronizedLyricsInterceptor>(
        CacheSynchronizedLyricsInterceptor,
      );

    jest.spyOn(context, 'switchToHttp').mockImplementation(
      jest.fn().mockReturnValue({
        getRequest: () => ({ path: key }),
      }),
    );
  });

  it('should be able to cache lyrics if the lyrics type is synchronized', async () => {
    const synchronizedTrack = createTrackEntity({
      lyrics: { syncType: 'LINE_SYNCED' },
    });

    const handler = {
      handle: () => of(synchronizedTrack),
    };

    const setCache = jest.fn();
    const getCache = jest.fn();

    jest.spyOn(cacheService, 'set').mockImplementation(setCache);
    jest.spyOn(cacheService, 'get').mockImplementation(getCache);

    const result = await firstValueFrom(
      await cacheSynchronizedLyricsInterceptor.intercept(context, handler),
    );

    expect(setCache).toHaveBeenCalledWith(key, synchronizedTrack);
    expect(result).toBe(synchronizedTrack);
  });

  it('should not cache lyrics if the lyrics type is not synchronized', async () => {
    const notSynchronizedTrack = createTrackEntity({
      lyrics: { syncType: 'UNSYNCED' },
    });

    const handler = {
      handle: () => of(notSynchronizedTrack),
    };

    const setCache = jest.fn();
    const getCache = jest.fn();

    jest.spyOn(cacheService, 'set').mockImplementation(setCache);
    jest.spyOn(cacheService, 'get').mockImplementation(getCache);

    const result = await firstValueFrom(
      await cacheSynchronizedLyricsInterceptor.intercept(context, handler),
    );

    expect(setCache).not.toHaveBeenCalled();
    expect(result).toBe(notSynchronizedTrack);
  });

  it('should be able to return cached lyrics if available', async () => {
    const cachedTrack = createTrackEntity();
    const handler = {
      handle: () => of(cachedTrack),
    };

    const setCache = jest.fn();
    const getCache = jest.fn().mockReturnValue(cachedTrack);

    jest.spyOn(cacheService, 'set').mockImplementation(setCache);
    jest.spyOn(cacheService, 'get').mockImplementation(getCache);

    const result = await firstValueFrom(
      await cacheSynchronizedLyricsInterceptor.intercept(context, handler),
    );

    expect(setCache).not.toHaveBeenCalled();
    expect(result).toBe(cachedTrack);
  });
});
