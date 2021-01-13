import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountAdmin } from './account-admin.entity';
import { AccountAdminController } from './account-admin.controller';
import { AccountAdminService } from './account-admin.service';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccountAdmin]), AccountModule],
  controllers: [AccountAdminController],
  providers: [AccountAdminService],
  exports: [AccountAdminService],
})
export class AccountAdminModule {}
