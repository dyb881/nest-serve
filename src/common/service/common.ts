import { REQUEST } from '@nestjs/core';
import { BadRequestException, Inject } from '@nestjs/common';
import { TransformInstanceToPlain } from 'class-transformer';
import { Repository, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { toWhere } from '../tools';
import { IdsDto } from '../dto';

export type TClass<T> = new (...args: any[]) => T;

/**
 * crud 公共服务
 */
export const CommonService = <
  Entity, // 实体
  CreateDto, // 创建
  UpdateDto, // 更新
  QueryDto, // 查询条件
  PaginationQueryDto, // 分页查询条件
>(
  _Entity: TClass<Entity>,
  _CreateDto: TClass<CreateDto>,
  _UpdateDto: TClass<UpdateDto>,
  _QueryDto: TClass<QueryDto>,
  _PaginationQueryDto: TClass<PaginationQueryDto>,
) => {
  class CommonService {
    constructor(
      @InjectRepository(_Entity) readonly repository: Repository<Entity>,
      @Inject(REQUEST) readonly req: any,
      readonly configService: ConfigService,
    ) {}

    /**
     * 查询所有数据
     */
    @TransformInstanceToPlain()
    async getList(data: QueryDto, options?: FindManyOptions<Entity>): Promise<Entity[]> {
      const list = await this.repository.find({
        where: toWhere(data),
        order: { create_date: 'DESC' } as any,
        ...options,
      });
      return list;
    }

    /**
     * 查询数据数据与总数
     */
    @TransformInstanceToPlain()
    async getListAndCount(
      _data: PaginationQueryDto,
      options?: FindManyOptions<Entity>,
    ): Promise<{ list: Entity[]; total: number }> {
      const { current, pageSize, ...data } = _data as any;
      const [list, total] = await this.repository.findAndCount({
        where: toWhere(data),
        order: { create_date: 'DESC' } as any,
        skip: (current - 1) * pageSize,
        take: pageSize,
        ...options,
      });
      return { list, total };
    }

    /**
     * 查询一条数据
     */
    @TransformInstanceToPlain()
    async get(id: string) {
      const one = await this.repository.findOneBy({ id } as any);
      if (!one) throw new BadRequestException('该数据不存在');
      return one;
    }

    /**
     * 创建数据
     */
    async create(data: CreateDto) {
      await this.repository.save(data as any);
    }

    /**
     * 更新数据
     */
    async update(id: string, data: UpdateDto) {
      await this.repository.update(id, data as any);
    }

    /**
     * 删除数据
     */
    async delete(ids: IdsDto['ids']) {
      if (!ids.length) throw new BadRequestException('ids 不可为空');
      await this.repository.delete(ids);
    }
  }

  return class extends CommonService {};
};
