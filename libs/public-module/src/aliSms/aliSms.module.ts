import { Module, DynamicModule } from '@nestjs/common';
import { AliSmsService, AliSmsServiceOptions } from './aliSms.service';

export interface AliSmsModuleAsyncOptions {
  isGlobal?: boolean; // 是否导出到全局
  useFactory: (...args: any[]) => Promise<AliSmsServiceOptions> | AliSmsServiceOptions; // 动态配置
  inject?: any[];
}

/**
 * 日志模块
 */
@Module({})
export class AliSmsModule {
  static forRoot({ isGlobal = false, useFactory, inject }: AliSmsModuleAsyncOptions): DynamicModule {
    return {
      global: isGlobal,
      module: AliSmsModule,
      providers: [
        {
          provide: AliSmsService,
          useFactory: async (...args: any[]) => {
            const options = await useFactory(...args);
            return new AliSmsService(options);
          },
          inject,
        },
      ],
      exports: [AliSmsService],
    };
  }
}
