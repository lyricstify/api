import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { Axios } from 'axios';
import { Token } from './interfaces/token.interface';

@Injectable()
export class TokenService {
  private readonly axios: Axios;

  constructor(private readonly configService: ConfigService) {
    this.axios = axios.create({
      baseURL: 'https://open.spotify.com',
      headers: {
        Accept: 'application/json',
        'App-Platform': 'WebPlayer',
        Cookie: this.configService.get('app.spotifyCookie'),
      },
    });
  }

  async create() {
    const token = await this.axios
      .get<Token>('/get_access_token', {
        params: { reason: 'transport', productType: 'web_player' },
      })
      .then((response) => response.data)
      .catch((error) => {
        const status: [string, number] =
          axios.isAxiosError(error) && error.response !== undefined
            ? [error.response.statusText, error.response.status]
            : [
                'Failed to retrieve Spotify internal token, please check your SPOTIFY_COOKIE environment.',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ];

        throw new HttpException(...status);
      });

    if (token.isAnonymous === true) {
      throw new InternalServerErrorException(
        'Your token is treated as anonymous, please check your SPOTIFY_COOKIE environment.',
      );
    }

    return token;
  }
}
