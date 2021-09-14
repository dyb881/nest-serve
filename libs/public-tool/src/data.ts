import moment from 'moment';

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
export const format = (value?: any, template = Precision.Second) => value && moment(value).format(template);

/**
 * 毫秒转化为时间字符串
 */
export const toTimeString = (time: number) => {
  let text = '';
  const second = Math.round(time / 1000);
  if (second < 60) text += `${second}秒`;
  else {
    const s = second % 60;
    const minute = (second - s) / 60;
    if (minute < 60) text += `${minute}分钟${s}秒`;
    else {
      const m = minute % 60;
      const hour = (minute - m) / 60;
      if (hour < 24) text += `${hour}小时${m}分钟${s}秒`;
      else {
        const h = hour % 24;
        const day = (hour - h) / 24;
        text += `${day}天${h}小时${m}分钟${s}秒`;
      }
    }
  }
  return text;
};

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
