import { configure, Configuration, getLogger } from 'log4js';

export type log4InitOptions = Partial<Configuration> & {
  filename: string;
};

/**
 * 日志初始化
 */
export const log4Init = ({ filename, ...config }: log4InitOptions) => {
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
    ...config,
  });

  return getLogger();
};
