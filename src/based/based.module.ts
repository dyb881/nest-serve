import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [AuthModule, AccountModule],
})
export class BasedModule {}
