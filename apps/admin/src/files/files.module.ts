import { Module } from '@nestjs/common';
import { httpModule } from 'config/module';
import { FilesController } from './files.controller';
import { FilesConfigController } from './files-config.controller';

@Module({
  imports: [httpModule({ asyncHost: () => process.env.GATEWAY_HOST_FILES })],
  controllers: [FilesController, FilesConfigController],
})
export class FilesModule {}
