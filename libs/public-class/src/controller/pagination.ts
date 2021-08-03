import { Get, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { CrudController } from './crud';

/**
 * 分页控制器
 */
export function PaginationController<
  Entity extends Function = any,
  CreateDto extends Function = any,
  UpdateDto extends Function = any,
  QueryDto extends Function = any,
  PaginationDto extends Function = any
>(_Entity: Entity, _CreateDto: CreateDto, _UpdateDto: UpdateDto, _QueryDto: QueryDto, _PaginationDto: PaginationDto) {
  class PaginationController extends CrudController(_Entity, _CreateDto, _UpdateDto) {
    constructor(readonly service: any) {
      super(service);
    }

    @MessagePattern(`${_Entity.name}.get.pagination`)
    @Get()
    @ApiOperation(`查询分页列表：${_Entity.name}.get.pagination`)
    @ApiQuery({ type: _QueryDto })
    @ApiResponse({ status: 200, type: _PaginationDto })
    pagination(@Query() data: QueryDto) {
      return this.service.pagination(data);
    }
  }

  return class extends PaginationController {};
}
