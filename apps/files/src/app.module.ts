import { Module } from '@nestjs/common';
import { configModule, typeOrmModule } from 'config/module';
import { FilesModule } from './files/files.module';
import { FilesConfigModule } from './files-config/files-config.module';

@Module({
  imports: [configModule('files'), typeOrmModule(), FilesModule, FilesConfigModule],
})
export class AppModule {}
