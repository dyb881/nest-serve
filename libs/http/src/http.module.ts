import { Module, DynamicModule } from '@nestjs/common';
import { HttpService } from './http.service';
import { TRequestConfig } from './request/types';
import Request from './request';

@Module({
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {
  static register(config: TRequestConfig): DynamicModule {
    return {
      module: HttpModule,
      providers: [
        {
          provide: 'REQUEST_INSTANCE_TOKEN',
          useValue: new Request(config),
        },
      ],
    };
  }

  static registerAsync(options: HttpModuleAsyncOptions): DynamicModule {
    return {
      module: HttpModule,
      providers: [
        {
          provide: 'REQUEST_INSTANCE_TOKEN',
          useFactory: async () => {
            const config = await options.useFactory();
            return new Request(config);
          },
        },
      ],
    };
  }
}

interface HttpModuleAsyncOptions {
  useFactory: () => Promise<TRequestConfig> | TRequestConfig;
}
