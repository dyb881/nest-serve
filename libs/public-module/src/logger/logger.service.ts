import { Injectable, ConsoleLogger } from '@nestjs/common';
import { Logger } from 'log4js';
import { log4Init, log4InitOptions } from './log4';

/**
 * 拓展日志服务
 * 加入 log4js 日志文件写入
 */
@Injectable()
export class LoggerService extends ConsoleLogger {
  log4js: Logger;
  filename: string;

  constructor(options?: log4InitOptions) {
    super();
    const { filename = 'logs/all.log', ..._options } = options || {};
    this.filename = filename;
    this.log4js = log4Init({ filename, ..._options });
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
