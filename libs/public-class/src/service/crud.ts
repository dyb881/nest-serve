import { BadRequestException } from '@nestjs/common';
import { Repository, FindConditions, FindOneOptions, SelectQueryBuilder } from 'typeorm';
import { TransformClassToPlain } from 'class-transformer';
import { toWhere } from '@app/public-tool';
import { IdsDto } from '../dto';

/**
 * 增刪查改服务
 */
export function CrudService<CreateDto = any, UpdateDto = any, Entity = any>(_Entity: Entity) {
  class CrudService {
    constructor(readonly repository: Repository<Entity>) {}

    /**
     * 查询所有数据
     * @param {FindConditions<Entity>} conditions 查询条件
     * @param updateQueryBuilder 更新查询构造器
     */
    @TransformClassToPlain()
    getMany(
      conditions?: FindConditions<Entity>,
      updateQueryBuilder?: <T extends SelectQueryBuilder<Entity>>(query: T) => T
    ) {
      let queryBuilder = this.repository.createQueryBuilder();
      if (conditions) queryBuilder = queryBuilder.where(toWhere(conditions));
      queryBuilder = updateQueryBuilder?.(queryBuilder) || queryBuilder.addOrderBy('create_date', 'DESC');
      return queryBuilder.getMany();
    }

    /**
     * 查询一条数据
     */
    @TransformClassToPlain()
    async findOne(conditions: string | FindConditions<Entity>, options?: FindOneOptions<Entity>) {
      const one = await this.repository.findOne(conditions, options);
      if (!one) throw new BadRequestException('该数据不存在');
      return one;
    }

    /**
     * 创建数据
     */
    async create(data: CreateDto) {
      await this.repository.save(data);
    }

    /**
     * 更新数据
     */
    async update(id: string, data: UpdateDto) {
      const one = await this.findOne(id);
      Object.assign(one, data, { update_date: new Date() });
      await this.repository.save(one);
    }

    /**
     * 删除数据
     */
    async delete(ids: IdsDto['ids']) {
      if (Array.isArray(ids) && !ids.length) throw new BadRequestException('ids 不可为空');
      await this.repository.delete(ids);
    }
  }

  return class extends CrudService {};
}
