export class TokenEntity {
  clientId: string;
  accessToken: string;
  accessTokenExpirationTimestampMs: number;
  isAnonymous: boolean;

  constructor(partial: Partial<TokenEntity>) {
    Object.assign(this, partial);
  }
}
