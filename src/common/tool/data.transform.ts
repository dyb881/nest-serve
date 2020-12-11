import { serveConfig } from '../global';
import { extname } from 'path';
import dayjs from 'dayjs';

// ---------------------- URL 相关数据转化 ---------------------- //

/**
 * 客户端 ip 字符串 转化纯 ip
 */
export const toIp = (ip: string) => ip?.replace?.('::ffff:', '');

const http = /^http/;

/**
 * 判断是否访问地址
 */
export const isHttp = (url: string) => http.test(url);

/**
 * 转化为可访问地址
 */
export const toUrl = (url: string) => (url && !isHttp(url) ? serveConfig.url + url : url);

// ---------------------- URL 相关数据转化 ---------------------- //

// ---------------------- 时间相关数据转化 ---------------------- //

/**
 * 时间格式化
 */
export const format = (value?: any, template = 'YYYY-MM-DD HH:mm:ss') => value && dayjs(value).format(template);

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

/**
 * 根据文件名获取文件类型
 */
export const getFileType = (filename: string) => {
  const suffix = extname(filename).slice(1);
  const file = serveConfig.file.find((i) => i.suffix.includes(suffix));
  return file?.key;
};

// ---------------------- 内容数据转化 ---------------------- //

// ---------------------- 数据转化器生成 ---------------------- //

const toOrFrom = (value) => value;
type TTransformer = { to?: typeof toOrFrom; from?: typeof toOrFrom };

/**
 * 生成转化对象
 */
export const createTransformer = ({ to = toOrFrom, from = toOrFrom }: TTransformer) => ({ to, from });

/**
 * 时间转化
 */
export const dateTransformer = createTransformer({ from: format });

/**
 * 文件路径转化
 */
export const fileTransformer = createTransformer({ from: toUrl });

// ---------------------- 数据转化器生成 ---------------------- //
