import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountUser } from './account-user.entity';
import { AccountUserController } from './account-user.controller';
import { AccountUserService } from './account-user.service';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccountUser]), AccountModule],
  controllers: [AccountUserController],
  providers: [AccountUserService],
  exports: [AccountUserService],
})
export class AccountUserModule {}
