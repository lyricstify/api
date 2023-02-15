import { Exclude } from 'class-transformer';
import type { LineEntity } from './line.entity';

export class LyricEntity {
  syncType: string;
  lines: LineEntity[];
  provider: string;
  providerLyricsId: string;
  providerDisplayName: string;
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
