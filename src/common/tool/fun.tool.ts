import { getClientIp } from 'request-ip';
import { fileTypeList, fileTypeSuffix } from '../constant';
import { extname } from 'path';
import dayjs from 'dayjs';

/**
 * 获取客户端 ip
 */
export const getIp = (req: Request) => getClientIp(req as any).replace('::ffff:', '');

/**
 * 生成时间格式化工具
 */
export const createFormat = (template = 'YYYY-MM-DD HH:mm:ss') => {
  return (value?: any) => value && dayjs(value).format(template);
};

/**
 * 默认时间格式化
 */
export const format = createFormat();

const toOrFrom = value => value;
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
 * 获取对象真实 key 数组
 */
export const getKeys = (object: object) => {
  // 获取 key 列表
  let keys: (string | number)[] = Object.keys(object);
  // 数组对象的 key 转化为数字
  if (Array.isArray(object)) keys = keys.map(i => +i);
  return keys;
};

/**
 * 获取枚举备注文本
 */
export const getEnumRemark = (object: object) => {
  return Object.keys(object)
    .map(i => `${i}:${object[i]}`)
    .join('、');
};

/**
 * 根据文件名获取文件类型
 */
export const getFileType = (filename: string) => {
  const suffix = extname(filename).slice(1);
  return fileTypeList.reduce((t, i) => (fileTypeSuffix[i].some(i => i === suffix) ? i : t), '');
};
