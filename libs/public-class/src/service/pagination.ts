import { Repository, SelectQueryBuilder } from 'typeorm';
import { TransformClassToPlain } from 'class-transformer';
import { toWhere, getPaginationData } from '@app/public-tool';
import { PaginationQueryDto } from '../dto';
import { CommonService } from './common';

/**
 * 分页服务
 */
export function PaginationService<
  QueryDto extends PaginationQueryDto = any,
  CreateDto = any,
  UpdateDto = any,
  Entity = any
>(_Entity: Entity) {
  class PaginationService extends CommonService<CreateDto, UpdateDto>(_Entity) {
    constructor(readonly repository: Repository<Entity>) {
      super(repository);
    }

    /**
     * 查询所有数据
     * @param {QueryDto} queryData 分页查询数据
     * @param updateQueryBuilder 更新查询构造器
     */
    @TransformClassToPlain()
    async pagination(queryData: QueryDto, updateQueryBuilder?: <T extends SelectQueryBuilder<Entity>>(query: T) => T) {
      const { skip, take, where } = getPaginationData(queryData);
      let queryBuilder = this.repository.createQueryBuilder().where(toWhere(where)).skip(skip).take(take);
      queryBuilder = updateQueryBuilder?.(queryBuilder) || queryBuilder.addOrderBy('create_date', 'DESC');
      const [list, total] = await queryBuilder.getManyAndCount();
      return { list, total };
    }
  }

  return class extends PaginationService {};
}
