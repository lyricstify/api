import { Exclude, Transform } from 'class-transformer';

export class LineEntity {
  @Transform(({ value }) => Number(value))
  startTimeMs: string;
  words: string;
  @Exclude()
  syllables: unknown[];
  @Transform(({ value }) => Number(value))
  endTimeMs: string;

  constructor(partial: Partial<LineEntity>) {
    Object.assign(this, partial);
  }
}
