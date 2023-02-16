import { Module } from '@nestjs/common';
import { LyricService } from './lyric.service';
import { LyricController } from './lyric.controller';
import { TokenModule } from '../token/token.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, TokenModule],
  controllers: [LyricController],
  providers: [LyricService],
})
export class LyricModule {}
