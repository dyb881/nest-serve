import { Like, In, SelectQueryBuilder } from 'typeorm';
import { pickBy, mapValues } from 'lodash';

// ---------------------- 请求入参操作 ---------------------- //

/**
 * 插入模糊查询
 */
export const insLike = (data: any, keys: string[]) => {
  keys.forEach((i) => {
    if (data[i]) data[i] = Like(`%${data[i]}%`);
  });
};

/**
 * 当未提交对应字段时，插入空值
 */
export const insNull = (data: any, keys: string[]) => {
  keys.forEach((i) => {
    if (data[i] === undefined) data[i] = null;
  });
};

/**
 * 转为筛选条件对象
 */
export const toWhere = (where: any) => {
  // 转化
  where = mapValues(where, (v) => {
    // 如果查询值为数组，则使用 in 的
    if (Array.isArray(v)) {
      v = v.length ? In(v) : undefined;
    }
    return v;
  });

  // 过滤空值
  where = pickBy(where, (v) => ![undefined, null, ''].includes(v));

  return where;
};

// ---------------------- 请求入参操作 ---------------------- //
