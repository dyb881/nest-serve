import { Get, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { CrudClientController } from './crud.client';
import { Permissions } from '@app/public-module';

/**
 * 增刪查改控制器
 * 微服务客户端
 */
export function ManyClientController<
  Entity extends Function = any,
  CreateDto extends Function = any,
  UpdateDto extends Function = any,
  QueryDto extends Function = any
>(permissions: string, _Entity: Entity, _CreateDto: CreateDto, _UpdateDto: UpdateDto, _QueryDto: QueryDto) {
  class ManyClientController extends CrudClientController(permissions, _Entity, _CreateDto, _UpdateDto) {
    constructor(readonly client: ClientProxy) {
      super(client);
    }

    @Permissions(`${permissions}.query`)
    @Get('all')
    @ApiOperation('查询所有')
    @ApiQuery({ type: _QueryDto })
    @ApiResponse({ status: 200, type: [_Entity] })
    getMany(@Query() data: QueryDto, ..._args: any[]) {
      return this.client.send(`${_Entity.name}.get.all`, data);
    }
  }

  return class extends ManyClientController {};
}
