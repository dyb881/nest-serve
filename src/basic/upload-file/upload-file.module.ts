import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UploadFile } from './upload-file.entity';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './upload-file.service';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import nuid from 'nuid';

@Module({
  imports: [
    TypeOrmModule.forFeature([UploadFile]),
    MulterModule.register({
      // 文件储存
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: join(__dirname, '../../../public/uploads'),
        // 在此处自定义保存后的文件名称
        filename: (_req, { originalname }, cb) => {
          const filename = nuid.next() + extname(originalname);
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
