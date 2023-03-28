import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import type { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import { httpCatchAxiosError } from '../common/http/http.catch-axios-error';
import { TokenService } from '../token/token.service';
import { LineEntity } from './entities/line.entity';
import { LyricEntity } from './entities/lyric.entity';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class LyricService {
  private readonly baseURL: string = 'https://spclient.wg.spotify.com';

  private readonly headers: AxiosRequestConfig['headers'] = {
    Accept: 'application/json',
    'App-Platform': 'WebPlayer',
  };

  constructor(
    private readonly tokenService: TokenService,
    private readonly httpService: HttpService,
  ) {}

  async findOne(id: string) {
    const token = await this.tokenService.findOneOrCreate();
    const request$ = this.httpService
      .get<TrackEntity>(`/color-lyrics/v2/track/${id}`, {
        baseURL: this.baseURL,
        headers: {
          ...this.headers,
          authorization: `Bearer ${token.accessToken}`,
        },
      })
      .pipe(
        httpCatchAxiosError({
          defaultStatusText:
            'Not found, failed to retrieve Spotify song lyrics',
        }),
      );

    const { data: track } = await firstValueFrom(request$);

    return new TrackEntity({
      ...track,
      lyrics: new LyricEntity({
        ...track.lyrics,
        lines: track.lyrics.lines.map((line) => new LineEntity(line)),
      }),
    });
  }
}
