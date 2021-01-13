import { HttpException, RequestTimeoutException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { HttpModule } from '@app/http';
import { TRequestConfig } from '@app/http/request/types';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import OSS from 'ali-oss';
import dayjs from 'dayjs';
import nuid from 'nuid';
import ip from 'ip';

/**
 * 是否家庭网络
 * 家庭网络不启用云服务器配置
 */
const isHome = /^192.168.31./.test(ip.address());

/**
 * 配置模块初始化
 */
export const configModule = (path: string, options?: ConfigModuleOptions) =>
  ConfigModule.forRoot({
    envFilePath: [isHome ? null : 'config/.dev.env', `config/${path}.env`, 'config/.env'],
    ...options,
  });

/**
 * 数据库模块初始化
 */
export const typeOrmModule = () =>
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
  });

/**
 * 文件模块初始化
 */
export const multerModule = () =>
  MulterModule.registerAsync({
    useFactory: () => ({
      // 文件储存
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: process.env.UPLOADS_PATH,
        // 在此处自定义保存后的文件名称
        filename: (_req, { originalname }, cb) => {
          // 当前日期
          const day = dayjs().format('YYYY-MM-DD');

          // 不存在文件夹则创建
          const folder = `${process.env.UPLOADS_PATH}/${day}`;
          existsSync(folder) || mkdirSync(folder);

          // 生成随机文件名
          const filename = nuid.next() + extname(originalname);

          return cb(null, `${day}/${filename}`);
        },
      }),
    }),
  });

/**
 * http请求模块
 */
export const httpModule = (config?: TRequestConfig) =>
  HttpModule.register({
    apiPath: '/api',
    defaultConfig: {
      timeout: 5000,
    },
    // interceptorsRequest: (config) => {
    //   return config;
    // },
    interceptorsResponse: (res) => {
      // 成功，直接返回数据
      if (res.ok) return res.data;

      // 请求超时
      if (res.errorCode === 'request timeout') throw new RequestTimeoutException();

      // 抛出异常
      throw new HttpException({ statusCode: res.code, error: res.error, message: res.message }, res.error);
    },
    ...config,
  });

/**
 * OSS初始化
 */
export const createOSS = () => {
  try {
    return new OSS({
      accessKeyId: process.env.OSS_ACCESSKEYID,
      accessKeySecret: process.env.OSS_ACCESSKEYSECRET,
      bucket: process.env.OSS_BUCKET,
      region: process.env.OSS_REGION,
      secure: true,
    });
  } catch {}
};

/**
 * STS初始化
 */
export const createSTS = () => {
  try {
    return new OSS.STS({
      accessKeyId: process.env.OSS_ACCESSKEYID,
      accessKeySecret: process.env.OSS_ACCESSKEYSECRET,
    });
  } catch {}
};

/**
 * OSS切换到绑定域名
 */
export const toOSSURL = (url: string) => {
  const newUrl = new URL(url);
  if (process.env.OSS_PROTOCOL) newUrl.protocol = process.env.OSS_PROTOCOL;
  if (process.env.OSS_HOST) newUrl.host = process.env.OSS_HOST;
  return newUrl.toString();
};
