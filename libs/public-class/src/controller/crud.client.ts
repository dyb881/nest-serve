import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { Permissions } from '@app/public-module';
import { IdsDto } from '@app/public-class';

/**
 * 增刪查改控制器
 * 微服务客户端
 */
export function CrudClientController<
  Entity extends Function = any,
  CreateDto extends Function = any,
  UpdateDto extends Function = any
>(permissions: string, _Entity: Entity, _CreateDto: CreateDto, _UpdateDto: UpdateDto) {
  class CrudClientController {
    constructor(readonly client: ClientProxy) {}

    @Permissions(`${permissions}.query`)
    @Get('all')
    @ApiOperation('查询所有')
    @ApiResponse({ status: 200, type: [_Entity] })
    getMany(..._args: any[]) {
      return this.client.send(`${_Entity.name}.get.all`, {});
    }

    @Permissions(`${permissions}.query`)
    @Get(':id')
    @ApiOperation('查询详情')
    @ApiResponse({ status: 200, type: _Entity })
    findOne(@Param('id') id: string, ..._args: any[]) {
      return this.client.send(`${_Entity.name}.get.one`, id);
    }

    @Permissions(`${permissions}.create`)
    @Post()
    @ApiOperation('添加')
    @ApiBody({ type: _CreateDto })
    create(@Body() data, ..._args: any[]) {
      return this.client.send(`${_Entity.name}.create`, data);
    }

    @Permissions(`${permissions}.update`)
    @Put(':id')
    @ApiOperation('编辑')
    @ApiBody({ type: _UpdateDto })
    update(@Param('id') id: string, @Body() data, ..._args: any[]) {
      return this.client.send(`${_Entity.name}.update`, { id, ...data });
    }

    @Permissions(`${permissions}.delete`)
    @Delete()
    @ApiOperation('删除')
    @ApiBody({ type: IdsDto })
    deletes(@Body() data: IdsDto, ..._args: any[]) {
      return this.client.send(`${_Entity.name}.delete`, data);
    }
  }

  return class extends CrudClientController {};
}
