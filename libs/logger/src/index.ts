import { Logger as LoggerSource } from '@nestjs/common';
import { toIp } from '@app/data-tool';
import log4js from 'log4js';

export class Logger extends LoggerSource {
  log4js: log4js.Logger;

  constructor(filename: string) {
    super();

    log4js.configure({
      appenders: {
        all: {
          filename: `${filename}/all.log`,
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
    });

    this.log4js = log4js.getLogger();
  }

  log(message: any, trace: string) {
    super.log(message, trace);
    this.log4js.info(trace, message);
  }

  error(message: any, trace: string) {
    super.error(message, trace);
    this.log4js.error(trace, message);
  }

  warn(message: any, trace: string) {
    super.warn(message, trace);
    this.log4js.warn(trace, message);
  }

  debug(message: any, trace: string) {
    super.debug(message, trace);
    this.log4js.debug(trace, message);
  }

  verbose(message: any, trace: string) {
    super.verbose(message, trace);
    this.log4js.info(trace, message);
  }

  /**
   * 打印请求
   */
  request(req: any) {
    const { method, url, user, body, ip } = req;
    this.log(url, `${toIp(ip)} ${method}`);
    user?.username && this.log(user?.username, '用户名');
    Object.keys(body).length && this.log(body, '请求参数');
  }
}
