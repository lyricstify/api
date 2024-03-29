import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ColorEntity } from './color.entity';
import { LyricEntity } from './lyric.entity';

export class TrackEntity {
  @ApiProperty()
  lyrics: LyricEntity;
  @Exclude()
  colors: ColorEntity;
  @Exclude()
  hasVocalRemoval: boolean;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
