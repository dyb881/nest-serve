import { Get, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { PaginationQueryDto } from '../dto';
import { CrudController } from './crud';

/**
 * 分页控制器
 */
export function PaginationController<
  QueryDto extends PaginationQueryDto = any,
  CreateDto = any,
  UpdateDto = any,
  Entity extends Function = any,
  PaginationDto extends Function = any
>(_Entity: Entity, _PaginationDto: PaginationDto) {
  class PaginationController extends CrudController<CreateDto, UpdateDto, Entity>(_Entity) {
    constructor(readonly service: any) {
      super(service);
    }

    @Get()
    @ApiOperation('查询列表')
    @ApiResponse({ status: 200, type: _PaginationDto })
    pagination(@Query() data: QueryDto) {
      return this.service.pagination(data);
    }
  }

  return class extends PaginationController {};
}
