import { Get, Query } from '@nestjs/common';
import { ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { CrudController } from './crud';

/**
 * 分页控制器
 */
export function PaginationController<
  CreateDto extends Function = any,
  UpdateDto extends Function = any,
  Entity extends Function = any,
  QueryDto extends Function = any,
  PaginationDto extends Function = any
>(_CreateDto: CreateDto, _UpdateDto: UpdateDto, _Entity: Entity, _QueryDto: QueryDto, _PaginationDto: PaginationDto) {
  class PaginationController extends CrudController(_CreateDto, _UpdateDto, _Entity) {
    constructor(readonly service: any) {
      super(service);
    }

    @Get()
    @ApiOperation('查询分页列表')
    @ApiQuery({ type: _QueryDto })
    @ApiResponse({ status: 200, type: _PaginationDto })
    pagination(@Query() data: QueryDto) {
      return this.service.pagination(data);
    }
  }

  return class extends PaginationController {};
}
