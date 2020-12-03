import { Transform } from 'class-transformer';

/**
 * 转空值
 * 防止提交空字符串
 */
export const Tundefined = () => Transform((v) => v || undefined);
