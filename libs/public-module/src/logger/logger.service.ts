import { Injectable, ConsoleLogger } from '@nestjs/common';
import { Logger, Configuration, configure, getLogger } from 'log4js';

export type LoggerServiceOptions = Partial<Configuration> & {
  filename: string;
};

/**
 * 拓展日志服务
 * 加入 log4js 日志文件写入
 */
@Injectable()
export class LoggerService extends ConsoleLogger {
  log4js: Logger;
  filename: string;

  constructor(options?: LoggerServiceOptions) {
    super();
    const { filename = 'logs/all.log', ..._options } = options || {};
    this.filename = filename;

    configure({
      appenders: {
        all: {
          filename,
          type: 'dateFile',
          // 配置 layout，此处使用自定义模式 pattern
          layout: { type: 'pattern', pattern: '%d [%p] %m' },
          // 日志文件按日期（天）切割
          pattern: 'yyyy-MM-dd',
          // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
          keepFileExt: true,
          // 输出的日志文件名是都始终包含 pattern 日期结尾
          alwaysIncludePattern: true,
          // 指定日志保留的天数
          daysToKeep: 10,
        },
      },
      categories: { default: { appenders: ['all'], level: 'all' } },
      ..._options,
    });

    this.log4js = getLogger();
  }

  log(message: any, trace: string) {
    super.log.apply(this, arguments);
    this.log4js.info(trace, message);
  }

  error(message: any, trace: string) {
    super.error.apply(this, arguments);
    this.log4js.error(trace, message);
  }

  warn(message: any, trace: string) {
    super.warn.apply(this, arguments);
    this.log4js.warn(trace, message);
  }

  debug(message: any, trace: string) {
    super.debug.apply(this, arguments);
    this.log4js.debug(trace, message);
  }

  verbose(message: any, trace: string) {
    super.verbose.apply(this, arguments);
    this.log4js.info(trace, message);
  }
}
