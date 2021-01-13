import { Like, In, SelectQueryBuilder } from 'typeorm';
import { PaginationQueryDto } from '@app/dto-tool';
import { pickBy, mapValues } from 'lodash';

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
 * 获取筛选条件对象
 */
export const getWhere = (where: any) => {
  // 过滤
  where = pickBy(where, (v) => ![undefined, null, ''].includes(v));

  // 转化
  where = mapValues(where, (v) => {
    if (!isNaN(Number(v))) v += '';
    else if (Array.isArray(v)) v = v.length ? In(v) : undefined;
    return v;
  });

  return where;
};

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
export const isNoNull = (data: any) => data !== undefined && data !== null && data !== '%%';

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

/**
 * 获取分页数据
 */
export const getPaginationData = <T extends PaginationQueryDto>({ current, pageSize, ...where }: T) => {
  const skip = (current - 1) * pageSize;
  const take = pageSize;
  return { skip, take, where };
};
