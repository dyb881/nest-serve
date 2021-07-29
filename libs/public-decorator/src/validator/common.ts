import {
  IsIn as IsInSource,
  Matches as MatchesSource,
  IsInt as IsIntSource,
  IsNotEmpty as IsNotEmptySource,
  IsDate as IsDateSource,
  ValidationOptions,
} from 'class-validator';
import { getKeys, getEnumRemark } from '@app/public-tool';

// 为了统一引用，导出常用装饰器
export { IsOptional } from 'class-validator';

/**
 * 验证是否输入
 */
export const IsNotEmpty = (message: string, options?: ValidationOptions) => {
  return IsNotEmptySource({ message: `请输入${message}`, ...options });
};

/**
 * 验证在数值范围内
 */
export const IsIn = (object: object, message = '值', options?: ValidationOptions) => {
  return IsInSource(getKeys(object), { message: `请选择正确的${message}，${getEnumRemark(object)}`, ...options });
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
 * 验证是否时间类型
 */
export const IsDate = (message: string, options?: ValidationOptions) => {
  return IsDateSource({ message: `${message}只能为时间类型`, ...options });
};
