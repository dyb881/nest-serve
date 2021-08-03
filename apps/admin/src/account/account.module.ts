import { Module } from '@nestjs/common';
import { AccountAdminController } from './admin.controller';

@Module({
  controllers: [AccountAdminController],
})
export class AccountModule {}
