import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [AuthModule, FilesModule, AccountModule],
})
export class BasedModule {}
