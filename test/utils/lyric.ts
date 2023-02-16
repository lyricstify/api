import type { TrackEntity } from '../../src/lyric/entities/track.entity';

export const createTrackEntity = (): TrackEntity => ({
  lyrics: {
    syncType: 'syncType',
    lines: [
      {
        startTimeMs: '0',
        words: 'words',
        syllables: [],
        endTimeMs: '0',
      },
    ],
    provider: 'provider',
    providerLyricsId: 'providerLyricsId',
    providerDisplayName: 'providerDisplayName',
    syncLyricsUri: 'syncLyricsUri',
    isDenseTypeface: true,
    alternatives: [],
    language: 'language',
    isRtlLanguage: false,
    fullscreenAction: 'fullscreenAction',
  },
  colors: {
    background: 0,
    text: 0,
    highlightText: 0,
  },
  hasVocalRemoval: false,
});
