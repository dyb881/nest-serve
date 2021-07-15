import dayjs from 'dayjs';

// ---------------------- URL 相关数据转化 ---------------------- //

/**
 * 客户端 ip 字符串 转化纯 ip
 */
export const toIp = (ip: string) => ip?.replace?.('::ffff:', '').replace('::1', '127.0.0.1');

// ---------------------- URL 相关数据转化 ---------------------- //

// ---------------------- 时间相关数据转化 ---------------------- //

/**
 * 时间格式化精度
 */
export enum Precision {
  Second = 'YYYY-MM-DD HH:mm:ss', // 秒
  Minute = 'YYYY-MM-DD HH:mm', // 分钟
  Hour = 'YYYY-MM-DD HH', // 小时
  Day = 'YYYY-MM-DD', // 天
  Month = 'YYYY-MM', // 月
  Year = 'YYYY', // 年
}

/**
 * 时间格式化
 */
export const format = (value?: any, template = Precision.Second) => value && dayjs(value).format(template);

// ---------------------- 时间相关数据转化 ---------------------- //

// ---------------------- 内容数据转化 ---------------------- //

/**
 * 获取对象真实 key 数组
 */
export const getKeys = (object: object) => {
  // 获取 key 列表
  let keys: (string | number)[] = Object.keys(object);
  // 数组对象的 key 转化为数字
  if (Array.isArray(object)) keys = keys.map((i) => +i);
  return keys;
};

/**
 * 获取枚举备注文本
 */
export const getEnumRemark = (object: object) => {
  return Object.keys(object)
    .map((i) => `${i}:${object[i]}`)
    .join('、');
};

// ---------------------- 内容数据转化 ---------------------- //
