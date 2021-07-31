import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountUser } from './user.entity';
import { AccountUserController } from './user.controller';
import { AccountUserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountUser])],
  controllers: [AccountUserController],
  providers: [AccountUserService],
  exports: [AccountUserService],
})
export class AccountUserModule {}
