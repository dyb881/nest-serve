import { IsIn as IsInSource, Matches as MatchesSource, IsInt as IsIntSource, ValidationOptions } from 'class-validator';
import { getKeys, getEnumRemark } from './data.transform';

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
