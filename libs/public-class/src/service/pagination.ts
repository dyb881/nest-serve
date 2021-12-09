import { Repository, SelectQueryBuilder } from 'typeorm';
import { TransformInstanceToPlain } from 'class-transformer';
import { toWhere, getPaginationData } from '@app/public-tool';
import { PaginationQueryDto as PaginationQueryDtoSource } from '../dto';
import { CrudService } from './crud';

/**
 * 分页服务
 */
export function PaginationService<
  PaginationQueryDto extends PaginationQueryDtoSource = any,
  CreateDto = any,
  UpdateDto = any,
  Entity = any
>(_Entity: Entity) {
  class PaginationService extends CrudService<CreateDto, UpdateDto, Entity>(_Entity) {
    constructor(readonly repository: Repository<Entity>) {
      super(repository);
    }

    /**
     * 查询所有数据
     * @param {PaginationQueryDto} queryData 分页查询数据
     * @param updateQueryBuilder 更新查询构造器
     */
    @TransformInstanceToPlain()
    async pagination(
      queryData: PaginationQueryDto,
      updateQueryBuilder?: <T extends SelectQueryBuilder<Entity>>(query: T) => T
    ) {
      const { skip, take, where } = getPaginationData(queryData);
      let queryBuilder = this.repository.createQueryBuilder().where(toWhere(where)).skip(skip).take(take);
      queryBuilder = updateQueryBuilder?.(queryBuilder) || queryBuilder.orderBy('create_date', 'DESC');
      const [list, total] = await queryBuilder.getManyAndCount();
      return { list, total };
    }
  }

  return class extends PaginationService {};
}
