import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';

@Module({
  imports: [AccountModule]
})
export class BasedModule {}
