import { Column as ColumnSource, ColumnOptions } from 'typeorm';
import { ColumnCommonOptions } from 'typeorm/browser/decorator/options/ColumnCommonOptions';
import { ColumnEnumOptions } from 'typeorm/browser/decorator/options/ColumnEnumOptions';
import { IsIn as IsInSource, Matches as MatchesSource, IsInt as IsIntSource, ValidationOptions } from 'class-validator';
import { ApiProperty as ApiPropertySource, ApiOperation as ApiOperationSource, ApiPropertyOptions, ApiOperationOptions } from '@nestjs/swagger';
import { getKeys, getEnumRemark } from './fun.tool';

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
 * 验证在数值范围内
 */
export const IsIn = (object: object, message = '请选择正确的', options?: ValidationOptions) => {
  return IsInSource(getKeys(object), { message: `${message}，${getEnumRemark(object)}`, ...options });
};

/**
 * 正则验证
 */
export const Matches = (pattern: RegExp, message: string, options?: ValidationOptions) => {
  return MatchesSource(pattern, { message, ...options });
};

/**
 * 验证是否数字
 */
export const IsInt = (message: string, options?: ValidationOptions) => {
  return IsIntSource({ message: `${message}只能为数字`, ...options });
};

/**
 * swagger 标注
 */
export const ApiProperty = (description: string, options?: ApiPropertyOptions) => {
  return ApiPropertySource({ description, ...options });
};

/**
 * swagger 枚举标注
 */
export const ApiPropertyEnum = (description: string, object: object, options?: ApiPropertyOptions) => {
  return ApiPropertySource({
    enum: getKeys(object),
    description: `${description}，${getEnumRemark(object)}`,
    ...options,
  });
};

/**
 * swagger 路由标注
 */
export const ApiOperation = (summary: string, options?: ApiOperationOptions) => {
  return ApiOperationSource({ summary, ...options });
};
