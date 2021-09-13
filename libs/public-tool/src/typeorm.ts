import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';
import { sha512 } from 'js-sha512';
import { format, toIp } from './data';

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
