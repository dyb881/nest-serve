import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [AuthModule, UploadFileModule, AccountModule],
})
export class BasicModule {}
