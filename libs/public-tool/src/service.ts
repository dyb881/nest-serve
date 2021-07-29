import { Like, In, SelectQueryBuilder } from 'typeorm';
import { PaginationQueryDto } from '@app/public-class';
import { pickBy, mapValues } from 'lodash';

// ---------------------- 请求入参操作 ---------------------- //

/**
 * 插入模糊查询
 */
export const insLike = (data: object, keys: string[]) => {
  keys.forEach((i) => {
    if (data[i]) data[i] = Like(`%${data[i]}%`);
  });
};

/**
 * 当未提交对应字段时，插入空值
 */
export const insNull = (data: object, keys: string[]) => {
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

/**
 * 分离分页数据及查询条件
 */
export const getPaginationData = <T extends PaginationQueryDto>({ current, pageSize, ...where }: T) => {
  const skip = (current - 1) * pageSize;
  const take = pageSize;
  return { skip, take, where };
};

// ---------------------- 请求入参操作 ---------------------- //

// ---------------------- 查询构造器 ---------------------- //

/**
 * 转为模糊查询
 */
export const toLike = (data: object, keys: string[]) => {
  keys.forEach((i) => {
    data[i] = `%${data[i] ?? ''}%`;
  });
};

/**
 * 判断是否非空查询条件
 */
export const isNoNull = (data: any) => ![undefined, null, '%%'].includes(data);

/**
 * 插入 Like 查询
 */
export const insWhereLike = <T extends SelectQueryBuilder<any>>(query: T, where: object, keys: string[]) => {
  keys.forEach((i) => {
    const [table, key = table] = i.split('.');
    isNoNull(where[key]) && query.andWhere(`${i} like :${key}`);
  });
  return query;
};

// ---------------------- 查询构造器 ---------------------- //
