import { Line } from './line.interface';

export interface Lyric {
  syncType: string;
  lines: Line[];
  provider: string;
  providerLyricsId: string;
  providerDisplayName: string;
  language: string;
}
