import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '../logger';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { merge } from 'lodash';

export interface GlobalModuleOptions {
  yamlFilePath: string[]; // 配置文件路径
}

/**
 * 全局模块
 */
@Module({})
export class GlobalModule {
  /**
   * 全局模块初始化
   */
  static forRoot({ yamlFilePath }: GlobalModuleOptions): DynamicModule {
    return {
      module: GlobalModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          cache: true,
          load: [
            () => {
              const configs = yamlFilePath.map((path) => {
                return load(readFileSync(path, 'utf8')) as Record<string, any>;
              });
              return merge(...configs);
            },
          ],
        }),
        LoggerModule.forRoot({
          isGlobal: true,
          useFactory: (configService: ConfigService) => {
            const path = configService.get('path.log');
            return { filename: `logs/${path}/${path}.log` };
          },
          inject: [ConfigService],
        }),
      ],
    };
  }
}
