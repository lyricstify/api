import type { TokenEntity } from '../../src/token/entities/token.entity';

export const createTokenEntity = ({
  clientId = 'clientId',
  accessToken = 'accessToken',
  accessTokenExpirationTimestampMs = 0,
  isAnonymous = false,
}: Partial<TokenEntity> = {}): TokenEntity => ({
  clientId,
  accessToken,
  accessTokenExpirationTimestampMs,
  isAnonymous,
});
