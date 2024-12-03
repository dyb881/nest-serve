import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { existsSync, mkdirSync } from 'fs';
import { join, extname } from 'path';
import { diskStorage } from 'multer';
import { nuid } from 'nuid';
import dayjs from 'dayjs';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { rootPath } from '../../tools';

/**
 * 文件上传模块
 */
@Module({
  imports: [
    // 上传文件模块
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uploadPath = configService.get('uploadPath');
        const path = join(rootPath, uploadPath);
        existsSync(path) || mkdirSync(path);

        return {
          // 文件储存
          storage: diskStorage({
            destination: function (_req, _file, cb) {
              const day = dayjs().format('YYYY-MM-DD');
              const folder = `${path}/${day}`;
              existsSync(folder) || mkdirSync(folder);
              cb(null, folder);
            },
            filename: (_req, { originalname }, cb) => {
              return cb(null, nuid.next() + extname(originalname));
            },
          }),
        };
      },
    }),
    // 静态文件服务
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uploadPath = configService.get('uploadPath');
        return [
          {
            rootPath: join(rootPath, uploadPath),
            serveRoot: `/${uploadPath}`,
            renderPath: `/${uploadPath}/:path*`,
            exclude: ['/api/:path*', '/swagger/:path*'],
          },
        ];
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
