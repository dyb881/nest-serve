import { applyDecorators } from '@nestjs/common';
import { Column, ColumnOptions, ValueTransformer } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { getKeys, getEnumRemark, format, toIp } from './data';
import { sha512 } from 'js-sha512';

export type EntityColumnOptions = ColumnOptions & {
  apiPropertyOptions?: ApiPropertyOptions; // 文档配置
  exclude?: boolean; // 排除在文档中
};

/**
 * 实体列装饰器
 */
export const EntityColumn = (name: string, length?: number | EntityColumnOptions, _options?: EntityColumnOptions) => {
  const decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = [];

  // 合成配置项
  if (typeof length === 'number') length = { length };
  const { apiPropertyOptions = {}, exclude, enum: _enum, ...options } = { ...length, ..._options };

  // 枚举类型补充备注
  if (_enum) {
    name += `，${getEnumRemark(_enum)}`;
    apiPropertyOptions.enum = getKeys(_enum);
  }

  // 数组类型
  if (options.type === 'simple-array') {
    if (!apiPropertyOptions.type) apiPropertyOptions.type = [String];
  }

  // 合成装饰器
  decorators.push(Column({ comment: name, ...options })); // 数据库
  if (exclude)
    decorators.push(Exclude()); // 排除字段
  else decorators.push(ApiProperty({ description: name, ...apiPropertyOptions })); // 文档

  return applyDecorators(...decorators);
};

// ---------------------- 数据转化器生成 ---------------------- //

// 默认转化方法
const toOrFrom = (value: any) => value;

/**
 * 生成转化对象
 */
export const createTransformer = ({ to = toOrFrom, from = toOrFrom }: Partial<ValueTransformer>) => ({ to, from });

// ---------------------- 数据转化器生成 ---------------------- //

/**
 * 时间转化
 */
export const dateTransformer = createTransformer({ from: format });

/**
 * sha512 密码转化
 */
export const sha512Transformer = createTransformer({ to: sha512 });

/**
 * 客户端 ip 字符串 转化纯 ip
 */
export const toIpTransformer = createTransformer({ to: toIp });
