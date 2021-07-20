import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module, DynamicModule, ValidationPipe, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { rootPath, HttpExceptionFilter, TransformInterceptor } from '@app/public-tool';
import { LoggerModule } from '../logger';

import { existsSync, mkdirSync, readFileSync } from 'fs';
import { join, extname } from 'path';

import redisStore from 'cache-manager-redis-store';
import { diskStorage } from 'multer';
import { load } from 'js-yaml';
import { merge } from 'lodash';
import dayjs from 'dayjs';
import nuid from 'nuid';

export interface GlobalModuleOptions {
  yamlFilePath?: string[]; // 配置文件路径
  typeorm?: boolean; // 开启 orm 模块
  multer?: boolean; // 开启 multer 文件上传模块
  cache?: boolean; // 开启缓存模块
  jwt?: boolean; // 开启 jwt 鉴权模块
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
    const { yamlFilePath = [], typeorm, multer, cache, jwt } = options || {};

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
                const filePath = join(rootPath, 'config', path);
                if (existsSync(filePath)) configs = merge(configs, load(readFileSync(filePath, 'utf8')));
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

    // 启动 orm
    if (typeorm) {
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

    // 开启 multer 文件上传
    if (multer) {
      imports.push(
        MulterModule.registerAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            let path = configService.get('path.upload');
            path = join(rootPath, path);
            return {
              // 文件储存
              storage: diskStorage({
                // 配置文件上传后的文件夹路径
                destination: path,
                // 在此处自定义保存后的文件名称
                filename: (_req, { originalname }, cb) => {
                  // 当前日期
                  const day = dayjs().format('YYYY-MM-DD');

                  // 不存在文件夹则创建
                  const folder = `${path}/${day}`;
                  existsSync(folder) || mkdirSync(folder);

                  // 生成随机文件名
                  const filename = nuid.next() + extname(originalname);

                  return cb(null, `${day}/${filename}`);
                },
              }),
            };
          },
          inject: [ConfigService],
        })
      );
    }

    // 开启缓存模块
    if (cache) {
      imports.push(
        CacheModule.registerAsync({
          useFactory: (configService: ConfigService) => {
            const cache = configService.get('cache');
            // 使用 redis 做缓存服务
            return cache.redis?.host ? { store: redisStore, ...cache.redis } : {};
          },
          inject: [ConfigService],
        })
      );
    }

    // 开启 jwt 鉴权模块
    if (jwt) {
      imports.push(
        JwtModule.registerAsync({
          useFactory: (configService: ConfigService) => {
            const { secret, expiresIn } = configService.get('jwt');
            return { secret, signOptions: { expiresIn } };
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
