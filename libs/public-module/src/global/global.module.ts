import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module, DynamicModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rootPath, HttpExceptionFilter, TransformInterceptor } from '@app/public-tool';
import { LoggerModule } from '../logger';
import { join } from 'path';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { merge } from 'lodash';

export interface GlobalModuleOptions {
  yamlFilePath?: string[]; // 配置文件路径
  typeorm?: boolean; // 是否开启 orm
}

/**
 * 全局模块
 */
@Module({})
export class GlobalModule {
  /**
   * 全局模块初始化
   */
  static forRoot(options: GlobalModuleOptions): DynamicModule {
    const { yamlFilePath = [], typeorm } = options || {};

    const imports: DynamicModule['imports'] = [
      // 配置模块
      ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        load: [
          () => {
            let configs: any = {};
            const configPath = ['config.yaml', `${process.env.NODE_ENV || 'development'}.yaml`, ...yamlFilePath];
            for (let path of configPath) {
              try {
                // 读取并解析配置文件
                configs = merge(configs, load(readFileSync(join(rootPath, 'config', path), 'utf8')));
              } catch {}
            }
            return configs;
          },
        ],
      }),
      // 日志模块
      LoggerModule.forRoot({
        isGlobal: true,
        useFactory: (configService: ConfigService) => {
          const path = configService.get('path.log');
          return { filename: join(rootPath, `logs/${path}/${path}.log`) };
        },
        inject: [ConfigService],
      }),
    ];

    if (typeorm) {
      // 启动 orm
      imports.push(
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => {
            const db = configService.get('db');
            return { ...db, autoLoadEntities: true };
          },
          inject: [ConfigService],
        })
      );
    }

    return {
      module: GlobalModule,
      imports,
      providers: [
        // 全局使用验证管道，并统一报错处理
        { provide: APP_PIPE, useClass: ValidationPipe },
        // 异常过滤器
        { provide: APP_FILTER, useClass: HttpExceptionFilter },
        // 响应参数转化拦截器
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
      ],
    };
  }
}
