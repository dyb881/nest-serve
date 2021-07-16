import { Injectable, Logger as LoggerSource } from '@nestjs/common';
import { Logger } from 'log4js';
import { log4Init, log4InitOptions } from './log4';

@Injectable()
export class LoggerService extends LoggerSource {
  log4js: Logger;
  filename: string;

  constructor(options?: log4InitOptions) {
    super();
    this.update(options);
  }

  update(options?: log4InitOptions) {
    const { filename = 'logs/all.log', ..._options } = options || {};
    this.filename = filename;
    this.log4js = log4Init({ filename, ..._options });
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
}
