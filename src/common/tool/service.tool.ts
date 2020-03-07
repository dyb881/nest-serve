import { Repository, FindConditions, ObjectLiteral } from 'typeorm';
import { PaginationQueryDto } from '../class';

/**
 * 分页
 */
export const pagination = <T extends ObjectLiteral>(
  repository: Repository<T>,
  queryPagination: PaginationQueryDto,
  where: FindConditions<T>[] | FindConditions<T> | ObjectLiteral | string
) => {
  const { current, pageSize } = queryPagination;
  return repository.findAndCount({
    where,
    order: { create_date: 'DESC' },
    skip: (current - 1) * pageSize,
    take: pageSize,
  });
};
