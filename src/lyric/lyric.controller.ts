import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Header,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocsFindOneLyrics } from './decorators/api-docs-find-one-lyrics.decorator';
import { CacheSynchronizedLyricsInterceptor } from './interceptors/cache-synchronized-lyrics.interceptor';
import { LyricService } from './lyric.service';

@ApiTags('lyrics')
@Controller({ version: '1', path: 'lyrics' })
@UseInterceptors(ClassSerializerInterceptor)
export class LyricController {
  constructor(private readonly lyricService: LyricService) {}

  @Get(':id')
  @Header('Cache-Control', 's-maxage=3600, stale-while-revalidate=1')
  @UseInterceptors(CacheSynchronizedLyricsInterceptor)
  @ApiDocsFindOneLyrics()
  async findOne(@Param('id') id: string) {
    return await this.lyricService.findOne(id);
  }
}
