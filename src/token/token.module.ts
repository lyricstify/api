import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TokenService } from './token.service';

@Module({
  imports: [HttpModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
