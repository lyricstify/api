import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { catchHttpException } from 'src/http/catch-http.exception';
import { TokenEntity } from './entities/token.interface';

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

  async create() {
    const request = this.httpService
      .get<TokenEntity>('/get_access_token', {
        baseURL: this.baseURL,
        headers: this.headers,
        params: { reason: 'transport', productType: 'web_player' },
      })
      .pipe(
        catchHttpException({
          defaultStatusText:
            'Failed to retrieve Spotify internal token, please check your SPOTIFY_COOKIE environment',
        }),
      );

    const { data: token } = (await firstValueFrom(
      request,
    )) as AxiosResponse<TokenEntity>;

    if (token.isAnonymous === true) {
      throw new InternalServerErrorException(
        'Your token is treated as anonymous, please check your SPOTIFY_COOKIE environment.',
      );
    }

    return new TokenEntity(token);
  }
}
