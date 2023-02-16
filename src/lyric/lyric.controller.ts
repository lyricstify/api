import {
  CacheInterceptor,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Header,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { LyricService } from './lyric.service';

@Controller({ version: '1', path: 'lyrics' })
@UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
export class LyricController {
  constructor(private readonly lyricService: LyricService) {}

  @Get(':id')
  @Header('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
  async findOne(@Param('id') id: string) {
    return await this.lyricService.findOne(id);
  }
}
