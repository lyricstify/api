import { Module } from '@nestjs/common';
import { LyricService } from './lyric.service';
import { LyricController } from './lyric.controller';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TokenModule],
  controllers: [LyricController],
  providers: [LyricService],
})
export class LyricModule {}
