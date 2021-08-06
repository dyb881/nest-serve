import { Get, Query } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { CrudController } from './crud';

/**
 * 查询所有的控制器
 */
export function ManyController<
  Entity extends Function = any,
  CreateDto extends Function = any,
  UpdateDto extends Function = any,
  QueryDto extends Function = any
>(_Entity: Entity, _CreateDto: CreateDto, _UpdateDto: UpdateDto, _QueryDto: QueryDto) {
  class ManyController extends CrudController(_Entity, _CreateDto, _UpdateDto) {
    constructor(readonly service: any) {
      super(service);
    }

    @EventPattern(`${_Entity.name}.get.all`)
    @Get('all')
    @ApiOperation(`查询所有：${_Entity.name}.get.all`)
    @ApiQuery({ type: _QueryDto })
    @ApiBody({ required: false })
    @ApiResponse({ status: 200, type: [_Entity] })
    getMany(@Query() data: QueryDto, @Payload() payload?: QueryDto) {
      return this.service.getMany(payload || data);
    }
  }

  return class extends ManyController {};
}
