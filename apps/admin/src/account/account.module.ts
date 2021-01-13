import { Module } from '@nestjs/common';
import { httpModule } from 'config/module';
import { AccountController } from './account.controller';
import { AccountAdminController } from './account-admin.controller';
import { AccountUserController } from './account-user.controller';

@Module({
  imports: [httpModule({ asyncHost: () => process.env.GATEWAY_HOST_ACCOUNT })],
  controllers: [AccountController, AccountAdminController, AccountUserController],
})
export class AccountModule {}
