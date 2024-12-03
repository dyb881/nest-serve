import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { rootPath } from '../..//tools';
import path from 'path';
import _ from 'lodash';

// 终端加上颜色
const lc = (code: number | string, text: any) => `\x1B[${code}m${text}\x1B[0m`;

// 定义日志级别颜色
const levelsColors = { error: 31, warn: 33, info: 32, debug: 34, verbose: 36 };

/**
 * 日志模块
 */
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logsPath = configService.get(`logsPath`); // 获取配置文件路径
        const filePath = path.join(rootPath, logsPath); // 绝对文件路径

        return {
          format: winston.format.combine(
            winston.format.ms(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
          ),
          transports: [
            new DailyRotateFile({
              format: winston.format.printf((i) => {
                const { code, error, message, data } = i;
                let log = [
                  i.timestamp, // 添加时间
                  `[${i.level}]`, // 添加等级
                  i.ms, // 添加毫秒
                  `[${i.context || i.stack[0]}]`, // 内容类型
                ].join(' ');

                // 处理打印
                if (error instanceof Error) {
                  log += '\n' + error.stack;
                } else if (code && error && message) {
                  log += '\n' + JSON.stringify({ code, error, message }, null, 2);
                } else log += '\t' + message;

                return log;
              }),
              filename: `${filePath}/%DATE%.log`, // 日志文件名
              datePattern: 'YYYY-MM-DD', // 按天生成日志文件
              zippedArchive: true, // 压缩日志文件
              maxSize: '20m', // 日志文件最大20MB
              maxFiles: '14d', // 保留最近 14 天的日志
            }),
            new winston.transports.Console({
              format: winston.format.printf((i) => {
                const { code, error, message, data } = i;
                let log = [
                  lc(30, i.timestamp), // 添加时间
                  lc(levelsColors[i.level], `[${i.level}]`), // 添加等级
                  lc(37, i.ms), // 添加毫秒
                  lc(33, `[${i.context || i.stack[0]}]`), // 内容类型
                ].join(' ');

                // 处理打印
                if (error instanceof Error) {
                  log += '\n' + lc(31, error.stack);
                } else if (code && error && message) {
                  log += '\n' + lc(31, JSON.stringify({ code, error, message }, null, 2));
                } else log += '\t' + lc(32, message);

                return log;
              }),
            }), // 控制台输出
          ],
          exitOnError: false, // 防止意外退出
        };
      },
    }),
  ],
})
export class LoggerModule {}
