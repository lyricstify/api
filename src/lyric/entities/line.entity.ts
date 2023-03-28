import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';

export class LineEntity {
  @ApiProperty({ type: Number })
  @Transform(({ value }) => Number(value))
  startTimeMs: string;
  @ApiProperty()
  words: string;
  @Exclude()
  syllables: unknown[];
  @ApiProperty({ type: Number })
  @Exclude()
  endTimeMs: string;

  constructor(partial: Partial<LineEntity>) {
    Object.assign(this, partial);
  }
}
