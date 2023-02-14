import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { LyricService } from './lyric.service';

@UseInterceptors(CacheInterceptor)
@Controller({ version: '1', path: 'lyrics' })
export class LyricController {
  constructor(private readonly lyricService: LyricService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.lyricService.findOne(id);
  }
}
