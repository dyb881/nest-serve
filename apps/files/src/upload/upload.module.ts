import { Module } from '@nestjs/common';
import { httpModule } from 'config/module';
import { multerModule } from 'config/module';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    httpModule({
      asyncHost: () => process.env.GATEWAY_HOST_FILES || `http://localhost:${process.env.SERVE_PORT}`,
    }),
    multerModule(),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
