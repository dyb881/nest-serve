import { Module, DynamicModule } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { log4InitOptions } from './log4';

export interface LoggerModuleAsyncOptions {
  isGlobal?: boolean; // 是否导出到全局
  useFactory: (...args: any[]) => Promise<log4InitOptions> | log4InitOptions; // 动态配置
  inject?: any[];
}

/**
 * 日志模块
 */
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
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
