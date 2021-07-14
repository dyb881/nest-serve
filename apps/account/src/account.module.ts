import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
