import {
  CACHE_MANAGER,
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { Observable, of, tap } from 'rxjs';
import { TrackEntity } from '../entities/track.entity';

@Injectable()
export class CacheSynchronizedLyricsInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<TrackEntity>,
  ): Promise<Observable<TrackEntity>> {
    const request = context.switchToHttp().getRequest<Request>();
    const key = request.path;
    const cached = await this.cacheManager.get<TrackEntity>(key);

    if (cached !== undefined) {
      return of(cached);
    }

    return next.handle().pipe(
      tap(async (result) => {
        if (result.lyrics.syncType === 'LINE_SYNCED') {
          await this.cacheManager.set(key, result);
        }
      }),
    );
  }
}
