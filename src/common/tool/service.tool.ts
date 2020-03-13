import { Repository, FindConditions, ObjectLiteral, FindManyOptions, Like, In } from 'typeorm';
import { PaginationQueryDto } from '../class';
import { pickBy, mapValues } from 'lodash';

/**
 * 分页
 */
export const pagination = <T extends ObjectLiteral>(
  repository: Repository<T>,
  queryPagination: PaginationQueryDto,
  where: FindConditions<T>[] | FindConditions<T> | ObjectLiteral | string,
  options?: FindManyOptions<T>
) => {
  const { current, pageSize } = queryPagination;
  return repository.findAndCount({
    where,
    order: { create_date: 'DESC' },
    skip: (current - 1) * pageSize,
    take: pageSize,
    ...options,
  });
};

/**
 * 插入模糊查询
 */
export const insLike = (data: object, keys: string[]) => {
  keys.forEach(i => {
    if (data[i]) data[i] = Like(`%${data[i]}%`);
  });
};

/**
 * 当未提交对应字段时，插入空值
 */
export const insNull = (data: object, keys: string[]) => {
  keys.forEach(i => {
    if (!data[i]) data[i] = null;
  });
};

/**
 * 获取筛选条件对象
 */
export const getWhere = (data: any) => {
  // 过滤
  data = pickBy(data, v => ![undefined, null, ''].includes(v));

  // 转化
  data = mapValues(data, v => {
    if (!isNaN(Number(v))) v += '';
    else if (Array.isArray(v)) v = v.length ? In(v) : undefined;
    return v;
  });

  return data;
};
