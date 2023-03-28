import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { LineEntity } from './line.entity';

export class LyricEntity {
  @ApiProperty({ enum: ['UNSYNCED', 'LINE_SYNCED'], example: 'LINE_SYNCED' })
  syncType: 'UNSYNCED' | 'LINE_SYNCED';
  @ApiProperty({
    type: LineEntity,
    isArray: true,
    example: [
      {
        startTimeMs: 2760,
        words: 'La-la-la-la-la-la',
      },
      {
        startTimeMs: 4510,
        words: 'La-la-la-la-la-la, la',
      },
    ],
  })
  lines: LineEntity[];
  @Exclude()
  provider: string;
  @Exclude()
  providerLyricsId: string;
  @Exclude()
  providerDisplayName: string;
  @ApiProperty({ example: 'ja' })
  language: string;
  @Exclude()
  syncLyricsUri: string;
  @Exclude()
  isDenseTypeface: boolean;
  @Exclude()
  alternatives: unknown[];
  @Exclude()
  isRtlLanguage: boolean;
  @Exclude()
  fullscreenAction: string;

  constructor(partial: Partial<LyricEntity>) {
    Object.assign(this, partial);
  }
}
