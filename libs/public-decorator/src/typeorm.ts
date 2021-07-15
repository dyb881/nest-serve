import { Column as ColumnSource, ColumnOptions } from 'typeorm';
import { ColumnCommonOptions } from 'typeorm/browser/decorator/options/ColumnCommonOptions';
import { ColumnEnumOptions } from 'typeorm/browser/decorator/options/ColumnEnumOptions';
import { getKeys, getEnumRemark } from '@app/public-tool';

/**
 * 列装饰器
 */
export const Column = (comment: string, length?: number | ColumnOptions, options?: ColumnOptions) => {
  if (typeof length === 'number') length = { length };
  return ColumnSource({ comment, ...length, ...options });
};

/**
 * 枚举列装饰器
 */
export const ColumnEnum = (comment: string, object: object, options?: ColumnCommonOptions & ColumnEnumOptions) => {
  return ColumnSource('enum', { enum: getKeys(object), comment: `${comment}，${getEnumRemark(object)}`, ...options });
};

/**
 * 数组列装饰器
 */
export const ColumnArray = (comment: string, options?: ColumnCommonOptions) => {
  return ColumnSource('simple-array', { comment, ...options });
};

/**
 * json列装饰器
 */
export const ColumnJson = (comment: string, options?: ColumnCommonOptions) => {
  return ColumnSource('simple-json', { comment, ...options });
};
