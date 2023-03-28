import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { TrackEntity } from '../entities/track.entity';

export function ApiDocsFindOneLyrics() {
  return applyDecorators(
    ApiOperation({
      description: 'Get time-synced song lyrics based on Spotify track id',
      externalDocs: {
        url: 'https://developer.spotify.com/documentation/web-api/reference',
        description:
          'To find out the track id of a song, you can visit the Spotify Web API page',
      },
    }),
    ApiParam({
      name: 'id',
      description: 'The track id of a Spotify song',
      examples: {
        'YOASOBI - ミスター': {
          value: '2YbNZLoiREBYZo4HeKB8Np',
          description:
            'Refers to https://open.spotify.com/track/2YbNZLoiREBYZo4HeKB8Np',
        },
        'Ryokuoushoku Shakai - Shout Baby': {
          value: '5K1m4aaPCxwnm9SKlWW1vh',
          description:
            'Refers to https://open.spotify.com/track/5K1m4aaPCxwnm9SKlWW1vh',
        },
      },
    }),
    ApiOkResponse({
      type: TrackEntity,
      description: 'Successfully fetch Spotify song lyrics',
    }),
    ApiNotFoundResponse({
      content: {
        'application/json': {
          example: {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Not found, failed to retrieve Spotify song lyrics',
          },
        },
      },
      description: 'Not found, failed to retrieve Spotify song lyrics',
    }),
  );
}
