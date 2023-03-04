import type { TokenEntity } from '../../src/token/entities/token.entity';

export const createTokenEntity = (
  entity: Partial<TokenEntity> = {},
): TokenEntity => ({
  clientId: 'clientId',
  accessToken: 'accessToken',
  accessTokenExpirationTimestampMs: 0,
  isAnonymous: false,
  ...entity,
});
