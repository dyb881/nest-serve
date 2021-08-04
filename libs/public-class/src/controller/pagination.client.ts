import { Get, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { CrudClientController } from './crud.client';
import { Permissions } from '@app/public-module';

/**
 * 分页控制器
 * 微服务客户端
 */
export function PaginationClientController<
  Entity extends Function = any,
  CreateDto extends Function = any,
  UpdateDto extends Function = any,
  QueryDto extends Function = any,
  PaginationDto extends Function = any
>(
  permissions: string,
  _Entity: Entity,
  _CreateDto: CreateDto,
  _UpdateDto: UpdateDto,
  _QueryDto: QueryDto,
  _PaginationDto: PaginationDto
) {
  class PaginationClientController extends CrudClientController(permissions, _Entity, _CreateDto, _UpdateDto) {
    constructor(readonly client: ClientProxy) {
      super(client);
    }

    @Permissions('account.admin.query')
    @Get()
    @ApiOperation('查询分页列表')
    @ApiQuery({ type: _QueryDto })
    @ApiResponse({ status: 200, type: _PaginationDto })
    pagination(@Query() data: QueryDto, ..._args: any[]) {
      return this.client.send(`${_Entity.name}.get.pagination`, data);
    }
  }

  return class extends PaginationClientController {};
}
