import { LineEntity } from '../../src/lyric/entities/line.entity';
import { RecursivePartial } from '../../src/common/types/recursive-partial-type';
import type { TrackEntity } from '../../src/lyric/entities/track.entity';

export const createTrackEntity = (
  entity: RecursivePartial<TrackEntity> = {},
): TrackEntity => ({
  lyrics: {
    syncType: 'LINE_SYNCED',
    provider: 'provider',
    providerLyricsId: 'providerLyricsId',
    providerDisplayName: 'providerDisplayName',
    syncLyricsUri: 'syncLyricsUri',
    isDenseTypeface: true,
    alternatives: [],
    language: 'language',
    isRtlLanguage: false,
    fullscreenAction: 'fullscreenAction',
    ...entity.lyrics,
    lines: (entity.lyrics?.lines || [
      {
        startTimeMs: '0',
        words: 'words',
        syllables: [],
        endTimeMs: '0',
      },
    ]) as LineEntity[],
  },
  colors: {
    background: 0,
    text: 0,
    highlightText: 0,
    ...entity.colors,
  },
  hasVocalRemoval: entity.hasVocalRemoval || false,
});
