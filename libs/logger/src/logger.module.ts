import { Module, DynamicModule } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { log4InitOptions } from './log4';

export interface LoggerModuleAsyncOptions {
  isGlobal?: boolean;
  useFactory: () => Promise<log4InitOptions> | log4InitOptions;
}

@Module({})
export class LoggerModule {
  static forRoot({ isGlobal = false, useFactory }: LoggerModuleAsyncOptions): DynamicModule {
    return {
      global: isGlobal,
      module: LoggerModule,
      providers: [
        {
          provide: LoggerService,
          useFactory: async () => {
            const options = await useFactory();
            return new LoggerService(options);
          },
        },
      ],
      exports: [LoggerService],
    };
  }
}
