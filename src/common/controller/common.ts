import { Param, Query, Body, Inject, BadRequestException } from '@nestjs/common';
import { Method } from '../tools';
import { IdsDto } from '../dto';
import { TClass } from '../service';
import { ValidationPipe } from './validation.pipe';

/**
 * 增刪查改控制器
 */
export function CommonController<
  Entity extends object, // 实体
  CreateDto extends object, // 创建
  UpdateDto extends object, // 更新
  QueryDto extends object, // 查询条件
  PaginationQueryDto extends object, // 分页查询条件
  PaginationDto extends object, // 返回分页数据
  Service extends { [key: string]: any }, // 对应服务
>(
  _Entity: TClass<Entity>,
  _CreateDto: TClass<CreateDto>,
  _UpdateDto: TClass<UpdateDto>,
  _QueryDto: TClass<QueryDto>,
  _PaginationQueryDto: TClass<PaginationQueryDto>,
  _PaginationDto: TClass<PaginationDto>,
  _Service: TClass<Service>,
) {
  class CommonController {
    constructor(@Inject(_Service) readonly service: Service) {}

    @Method('查询所有数据', ['Get', 'all'], { res: [_Entity], query: _QueryDto, roles: [_Entity.name, 'query'] })
    getList(@Query(new ValidationPipe(_QueryDto)) data: QueryDto) {
      return this.service.getList(data);
    }

    @Method('查询分页列表', 'Get', { res: _PaginationDto, query: _PaginationQueryDto, roles: [_Entity.name, 'query'] })
    getListAndCount(@Query(new ValidationPipe(_PaginationQueryDto)) data: PaginationQueryDto) {
      return this.service.getListAndCount(data);
    }

    @Method('查询详情', ['Get', ':id'], { res: _Entity, roles: [_Entity.name, 'query'] })
    get(@Param('id') id: string) {
      return this.service.get(id);
    }

    @Method('添加', 'Post', { body: _CreateDto, roles: [_Entity.name, 'create'] })
    async create(@Body(new ValidationPipe(_CreateDto)) data: CreateDto) {
      await this.service.create(data);
    }

    @Method('编辑', ['Put', ':id'], { body: _UpdateDto, roles: [_Entity.name, 'update'] })
    async update(@Param('id') id: string, @Body(new ValidationPipe(_UpdateDto)) data: UpdateDto) {
      await this.service.update(id, data);
    }

    @Method('删除', 'Delete', { body: IdsDto, roles: [_Entity.name, 'delete'] })
    async delete(@Body() { ids }: IdsDto) {
      await this.service.delete(ids);
    }
  }

  return class extends CommonController {};
}
