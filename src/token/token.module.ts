import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TokenService } from './token.service';

@Module({
  imports: [ConfigModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
