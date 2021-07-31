import { Module, DynamicModule } from '@nestjs/common';
import { LoggerService, LoggerServiceOptions } from './logger.service';

export interface LoggerModuleAsyncOptions {
  isGlobal?: boolean; // 是否导出到全局
  useFactory: (...args: any[]) => Promise<LoggerServiceOptions> | LoggerServiceOptions; // 动态配置
  inject?: any[];
}

/**
 * 日志模块
 */
@Module({})
export class LoggerModule {
  static forRoot({ isGlobal = false, useFactory, inject }: LoggerModuleAsyncOptions): DynamicModule {
    return {
      global: isGlobal,
      module: LoggerModule,
      providers: [
        {
          provide: LoggerService,
          useFactory: async (...args: any[]) => {
            const options = await useFactory(...args);
            return new LoggerService(options);
          },
          inject,
        },
      ],
      exports: [LoggerService],
    };
  }
}
