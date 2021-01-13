import { Module } from '@nestjs/common';
import { configModule } from 'config/module';
import { AccountModule } from './account/account.module';
import { FilesModule } from './files/files.module';
import { UploadModule } from 'apps/files/src/upload/upload.module';
import { InfosModule } from './infos/infos.module';

@Module({
  imports: [configModule('admin'), AccountModule, FilesModule, UploadModule, InfosModule],
})
export class AppModule {}
