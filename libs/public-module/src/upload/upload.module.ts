import { Module, DynamicModule } from '@nestjs/common';
import { UploadServiceOptions, UploadService } from './upload.service';
import { UploadController } from './upload.controller';

export interface UploadModuleAsyncOptions {
  isGlobal?: boolean; // 是否导出到全局
  useFactory: (...args: any[]) => Promise<UploadServiceOptions> | UploadServiceOptions; // 动态配置
  inject?: any[];
}

/**
 * 文件上传模块
 */
@Module({})
export class UploadModule {
  static forRoot({ isGlobal = false, useFactory, inject }: UploadModuleAsyncOptions): DynamicModule {
    return {
      global: isGlobal,
      module: UploadModule,
      controllers: [UploadController],
      providers: [
        {
          provide: UploadService,
          useFactory: async (...args: any[]) => {
            const options = await useFactory(...args);
            return new UploadService(options);
          },
          inject,
        },
      ],
      exports: [UploadService],
    };
  }
}
