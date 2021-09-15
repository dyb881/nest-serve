import { Module, DynamicModule } from '@nestjs/common';
import { AliOssServiceOptions, AliOssService } from './aliOss.service';
import { AliOssController } from './aliOss.controller';

export interface AliOssModuleAsyncOptions {
  isGlobal?: boolean; // 是否导出到全局
  useFactory: (...args: any[]) => Promise<AliOssServiceOptions> | AliOssServiceOptions; // 动态配置
  inject?: any[];
}

/**
 * 阿里云OSS模块
 */
@Module({})
export class AliOssModule {
  static forRoot({ isGlobal = false, useFactory, inject }: AliOssModuleAsyncOptions): DynamicModule {
    return {
      global: isGlobal,
      module: AliOssModule,
      controllers: [AliOssController],
      providers: [
        {
          provide: AliOssService,
          useFactory: async (...args: any[]) => {
            const options = await useFactory(...args);
            return new AliOssService(options);
          },
          inject,
        },
      ],
      exports: [AliOssService],
    };
  }
}
