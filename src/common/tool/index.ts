import { Logger } from '@nestjs/common';
import { IsIn, Matches, ValidationOptions } from 'class-validator';
import { getClientIp } from 'request-ip';
import { sha512 } from 'js-sha512';
import dayjs from 'dayjs';

type TValidator = { isIn?: any[]; matches?: RegExp; message: string };
export type TValidatorConfig = { [key: string]: TValidator };

/**
 * 创建字段正则验证装饰器
 */
export const createValidator = <T extends TValidatorConfig>(configs: T) => (
  key: keyof T,
  newOptions?: ValidationOptions
) => {
  const { isIn, matches, message } = configs[key];
  const options = { message, ...newOptions };
  if (isIn) return IsIn(isIn, options);
  if (matches) return Matches(matches, options);
};

/**
 * 获取客户端 ip
 */
export const getIp = (req: Request) => getClientIp(req as any).replace('::ffff:', '');

/**
 * 打印日志
 */
export const log = (type: keyof Logger, req?: Request) => {
  Logger[type]('----------- start -----------');
  if (req) {
    Logger[type](`请求路径 ${req.url}`);
    Logger[type](`请求IP ${getIp(req)}`);
  }
  return (...msgs: any[]) => {
    msgs.forEach(i => Logger[type](i));
    Logger[type]('----------- end -----------');
  };
};

/**
 * 公用列配置
 */
export const columnOptions = {
  /**
   * 时间
   */
  date: {
    transformer: {
      to: value => value,
      from: value => value && dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
  },

  /**
   * 密码
   */
  password: {
    length: 128,
    transformer: { to: sha512, from: value => value },
  },

  /**
   * 创建枚举配置
   */
  createEnum: (comment: string, enumObject: object, defaults?: number | string) => {
    const isArray = Array.isArray(enumObject);
    const keys = Object.keys(enumObject).map(i => +i);
    return {
      enum: keys,
      comment: `${comment}，${keys.map(i => `${i}:${enumObject[i]}`).join('、')}`,
      default: defaults ?? keys[0],
    };
  },
};
