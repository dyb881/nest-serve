import { BadRequestException } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, FindConditions, SelectQueryBuilder } from 'typeorm';
import { TransformClassToPlain } from 'class-transformer';
import { PaginationQueryDto } from '@app/dto-tool';
import { getWhere, getPaginationData } from './tool';
import { merge, cloneDeepWith } from 'lodash';

/**
 * 公用服务<数据实体，查询，创建，更新>
 * 数据实体必填，其他默认 any
 */
export class CommonService<T extends object, Q extends PaginationQueryDto = any, C = any, U = any> {
  /**
   * 关系表
   */
  relations: string[] = [];

  constructor(readonly repository: Repository<T>) {}

  @TransformClassToPlain()
  findAll({ where, order, ...options }: FindManyOptions<T>) {
    return this.repository.find({
      where: getWhere(where),
      order: { create_date: 'DESC', ...order },
      relations: this.relations,
      ...options,
    });
  }

  @TransformClassToPlain()
  async pagination(data: Q, options?: FindManyOptions<T>) {
    const { skip, take, where } = getPaginationData(data);
    const { order, ...option } = options || {};
    const [list, total] = await this.repository.findAndCount({
      skip,
      take,
      where: getWhere(where),
      order: { create_date: 'DESC', ...order },
      relations: this.relations,
      ...option,
    });
    return { list, total };
  }

  @TransformClassToPlain()
  async paginationQueryBuilder(
    data: Q,
    alias: string,
    createQueryBuilder: (query: SelectQueryBuilder<T>, where: Omit<Q, 'current' | 'pageSize'>) => SelectQueryBuilder<T>
  ) {
    const { skip, take, where } = getPaginationData(data);
    const query = this.repository
      .createQueryBuilder(alias)
      .skip(skip)
      .take(take)
      .orderBy({ [`${alias}.create_date`]: 'DESC' });
    this.relations.forEach((relation) => {
      query.innerJoinAndSelect(`${alias}.${relation}`, relation);
    });
    const [list, total] = await createQueryBuilder(query, where).setParameters(where).getManyAndCount();
    return { list, total };
  }

  @TransformClassToPlain()
  async findOne(id: string, options?: FindOneOptions<T>) {
    const one = await this.repository.findOne(id, { relations: this.relations, ...options });
    if (!one) throw new BadRequestException('该数据不存在');
    return one;
  }

  async create(data: C) {
    await this.repository.save(data);
  }

  async update(id: string, data: U, options?: FindOneOptions<T>) {
    const one = await this.findOne(id, options);
    merge(one, data);
    // 递归删除更新时间
    cloneDeepWith(one, (_value, key, object: any) => {
      if (key === 'update_date') delete object.update_date;
    });
    await this.repository.save(one);
  }

  async delete(ids: string[] | FindConditions<T>) {
    if (Array.isArray(ids) && !ids.length) throw new BadRequestException('ids 不可为空');
    await this.repository.delete(ids);
  }
}
