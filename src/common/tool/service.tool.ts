import { Repository, FindConditions, ObjectLiteral, FindManyOptions, Like } from 'typeorm';
import { PaginationQueryDto } from '../class';

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
