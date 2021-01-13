import { Module } from '@nestjs/common';
import { configModule } from 'config/module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { UploadModule } from 'apps/files/src/upload/upload.module';
import { FilesModule } from './files/files.module';
import { InfosModule } from './infos/infos.module';

@Module({
  imports: [configModule('admin'), AuthModule, AccountModule, UploadModule, FilesModule, InfosModule],
})
export class AppModule {}
