import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './files.entity';
import { MulterModule } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import dayjs from 'dayjs';
import nuid from 'nuid';

@Module({
  imports: [
    TypeOrmModule.forFeature([Files]),
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: join(__dirname, '../../../public/uploads', dayjs().format('YYYY-MM-DD')),
        filename: (_req, { originalname }, cb) => {
          // 在此处自定义保存后的文件名称
          const filename = nuid.next() + extname(originalname);
          return cb(null, filename);
        },
      }),
    }),
  ],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
