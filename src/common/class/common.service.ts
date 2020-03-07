import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransformClassToPlain } from 'class-transformer';
import { PaginationQueryDto } from './common.dto';
import { pagination } from '../tool';

/**
 * 公用服务<数据实体，查询，创建，更新>
 * 数据实体必填，其他默认 any
 */
export class CommonService<T, Q extends PaginationQueryDto = any, C = any, U = any> {
  constructor(readonly repository: Repository<T>) {}

  @TransformClassToPlain()
  async pagination({ current, pageSize, ...data }: Q) {
    const [list, total] = await pagination(this.repository, { current, pageSize }, data);
    return { list, total };
  }

  @TransformClassToPlain()
  async findOne(id: string) {
    const one = await this.repository.findOne(id);
    if (!one) throw new BadRequestException('该数据不存在');
    return one;
  }

  async create(data: C) {
    await this.repository.save(data);
  }

  async update(id: string, data: U) {
    const one = await this.findOne(id);
    Object.assign(one, data);
    await this.repository.save(one);
  }

  async delete(ids: string[]) {
    if (!ids?.length) throw new BadRequestException('ids 不可为空');
    await this.repository.delete(ids);
  }
}
