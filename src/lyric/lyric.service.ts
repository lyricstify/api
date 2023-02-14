import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { type Axios } from 'axios';
import { TokenService } from 'src/token/token.service';
import type { Lyric } from './interfaces/lyric.interface';

@Injectable()
export class LyricService {
  private readonly axios: Axios;

  constructor(private readonly tokenService: TokenService) {
    this.axios = axios.create({
      baseURL: 'https://spclient.wg.spotify.com/',
      headers: {
        Accept: 'application/json',
        'App-Platform': 'WebPlayer',
      },
    });
  }

  async findOne(id: string) {
    const token = await this.tokenService.create();
    const lyric = await this.axios
      .get<Lyric>(`/color-lyrics/v2/track/${id}`, {
        headers: { authorization: `Bearer ${token.accessToken}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        const hasErrorStatus =
          axios.isAxiosError(error) === true && error.response !== undefined;
        const status: [string, number] =
          hasErrorStatus === true
            ? [error.response.statusText, error.response.status]
            : [
                'Failed to retrieve lyrics data',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ];

        throw new HttpException(...status);
      });

    return lyric;
  }
}
