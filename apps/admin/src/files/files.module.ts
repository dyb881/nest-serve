import { Module } from '@nestjs/common';
import { cacheModule, httpModule } from 'config/module';
import { FilesController } from './files.controller';
import { FilesConfigController } from './files-config.controller';

@Module({
  imports: [cacheModule(), httpModule({ asyncHost: () => process.env.GATEWAY_HOST_FILES })],
  controllers: [FilesController, FilesConfigController],
})
export class FilesModule {}
