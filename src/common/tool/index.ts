import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QueryPaginationDto } from '../dto/common.dto';
import { IsIn, Matches, ValidationOptions } from 'class-validator';
import { getClientIp } from 'request-ip';
import { sha512 } from 'js-sha512';
import { mapValues } from 'lodash';
import dayjs from 'dayjs';

/**
 * 分页
 */
export const pagination = <T extends any, P extends object = {}>(
  repository: Repository<T>,
  { current, pageSize, ...data }: P & QueryPaginationDto
) => {
  return repository.findAndCount({
    where: mapValues(data, i => (isNaN(i) ? i : '' + i)),
    order: { create_date: 'DESC' },
    skip: (current - 1) * pageSize,
    take: pageSize,
  });
};

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
    const { method, url, body } = req;
    Logger[type](`${method} ${url}`);
    Logger[type](`IP ${getIp(req)}`);
    Object.keys(body).length && Logger[type](body);
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
    let keys: (string | number)[] = Object.keys(enumObject);
    if (Array.isArray(enumObject)) keys = keys.map(i => +i);
    return {
      enum: keys,
      comment: `${comment}，${keys.map(i => `${i}:${enumObject[i]}`).join('、')}`,
      default: defaults ?? keys[0],
    };
  },
};
