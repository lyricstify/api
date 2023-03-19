import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { httpCatchAxiosError } from '../common/http/http.catch-axios-error';
import { TokenEntity } from './entities/token.entity';

@Injectable()
export class TokenService {
  private readonly baseURL: string = 'https://open.spotify.com';

  private readonly headers: AxiosRequestConfig['headers'] = {
    Accept: 'application/json',
    'App-Platform': 'WebPlayer',
    Cookie: this.configService.get<string>('app.spotifyCookie'),
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async get() {
    const request$ = this.httpService
      .get<TokenEntity>('/get_access_token', {
        baseURL: this.baseURL,
        headers: this.headers,
        params: { reason: 'transport', productType: 'web_player' },
      })
      .pipe(
        httpCatchAxiosError({
          defaultStatusText:
            'Failed to retrieve Spotify internal token, please check your SPOTIFY_COOKIE environment',
        }),
      );

    const { data: token } = await firstValueFrom(request$);

    if (token.isAnonymous === true) {
      throw new InternalServerErrorException(
        'Your token is treated as anonymous, please check your SPOTIFY_COOKIE environment.',
      );
    }

    return new TokenEntity(token);
  }
}
