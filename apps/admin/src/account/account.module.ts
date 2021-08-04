import { Module } from '@nestjs/common';
import { AdminRoleController } from './admin-role.controller';
import { AccountAdminController } from './admin.controller';
import { AccountUserController } from './user.controller';

@Module({
  controllers: [AdminRoleController, AccountAdminController, AccountUserController],
})
export class AccountModule {}
