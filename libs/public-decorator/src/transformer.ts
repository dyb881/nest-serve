import { Transform, Type } from 'class-transformer';

/**
 * 空字符串转undefined
 * 防止提交空字符串引起验证
 */
export const ToUndefined = () => Transform(({ value }) => (value === '' ? undefined : value));

/**
 * 转数字类型
 */
export const ToNumber = () => Type(() => Number);

/**
 * 转时间类型
 */
export const ToDate = () => Type(() => Date);
