import { Module } from '@nestjs/common';
import { FilesConfigController } from './files-config.controller';
import { FilesConfigService } from './files-config.service';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  controllers: [FilesConfigController],
  providers: [FilesConfigService],
  exports: [FilesConfigService],
})
export class FilesConfigModule {}
