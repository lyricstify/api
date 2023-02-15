import {
  CacheInterceptor,
  Controller,
  Get,
  Header,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { LyricService } from './lyric.service';

@UseInterceptors(CacheInterceptor)
@Controller({ version: '1', path: 'lyrics' })
export class LyricController {
  constructor(private readonly lyricService: LyricService) {}

  @Get(':id')
  @Header('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
  async findOne(@Param('id') id: string) {
    return this.lyricService.findOne(id);
  }
}
