import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import { rootPath } from './tools';
import { ConfigService } from '@nestjs/config';
import { ConfigModule, LoggerModule, UploadModule } from './imports';
import { AllExceptionFilter, TransformInterceptor } from './providers';

// 缓存
import { CacheModule } from '@nestjs/cache-manager';
// 其他持久化储存方式：https://github.com/jaredwray/keyv
import KeyvSqlite from '@keyv/sqlite';

// 数据库
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * 全局模块
 */
@Module({
  imports: [
    ConfigModule, // 配置模块
    LoggerModule, // 日志模块
    UploadModule, // 文件上传
    // 缓存模块
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const database = configService.get<string>('cache.sqlite.database');
        const filePath = path.join(rootPath, database); // 绝对文件路径

        // 自动创建文件夹
        const sqlsPath = path.dirname(filePath);
        existsSync(sqlsPath) || mkdirSync(sqlsPath);

        const keyvSqlite = new KeyvSqlite(filePath);
        return { store: keyvSqlite };
      },
    }),
    // 数据库模块
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.get('db');
        if (db.type === 'sqlite') {
          const filePath = path.join(rootPath, db.database); // 绝对文件路径
          db.database = filePath;
        }
        return db;
      },
    }),
  ],
  providers: [
    // 全局使用验证管道，并统一报错处理
    { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true }) },
    // 异常过滤器
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    // 响应参数转化拦截器
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class CommonModule {}
