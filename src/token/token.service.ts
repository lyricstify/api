import { HttpService } from '@nestjs/axios';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AxiosRequestConfig } from 'axios';
import { Cache } from 'cache-manager';
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
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async create() {
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

  async findOneOrCreate() {
    const key = 'access_token';
    const cached = await this.cacheManager.get<TokenEntity>(key);

    if (cached !== undefined) {
      return cached;
    }

    const token = await this.create();
    await this.cacheManager.set(
      key,
      token,
      // Make sure the cached token is expired 5s faster before its actual expired time
      token.accessTokenExpirationTimestampMs - 5000 - new Date().getTime(),
    );

    return token;
  }
}
