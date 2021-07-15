import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';
import { format } from './data';

// ---------------------- 数据转化器生成 ---------------------- //

// 默认转化方法
const toOrFrom = (value: any) => value;

/**
 * 生成转化对象
 */
export const createTransformer = ({ to = toOrFrom, from = toOrFrom }: Partial<ValueTransformer>) => ({ to, from });

/**
 * 时间转化
 */
export const dateTransformer = createTransformer({ from: format });

// ---------------------- 数据转化器生成 ---------------------- //
