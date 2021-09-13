import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { IdsDto } from '@app/public-class';

/**
 * 增刪查改控制器
 */
export function CrudController<
  Entity extends Function = any,
  CreateDto extends Function = any,
  UpdateDto extends Function = any
>(_Entity: Entity, _CreateDto: CreateDto, _UpdateDto: UpdateDto) {
  class CrudController {
    constructor(readonly service: any) {}

    @EventPattern(`${_Entity.name}.get.one`)
    @Get(':id')
    @ApiOperation(`查询详情：${_Entity.name}.get.one`)
    @ApiParam({ name: 'id' })
    @ApiBody({ required: false })
    @ApiResponse({ status: 200, type: _Entity })
    findOne(@Param('id') id: string, @Payload() payload?: any) {
      return this.service.findOne(id || payload);
    }

    @EventPattern(`${_Entity.name}.create`)
    @Post()
    @ApiOperation(`添加：${_Entity.name}.create`)
    @ApiBody({ type: _CreateDto })
    async create(@Body() data: CreateDto) {
      await this.service.create(data);
    }

    @EventPattern(`${_Entity.name}.update`)
    @Put(':id')
    @ApiOperation(`编辑：${_Entity.name}.update`)
    @ApiParam({ name: 'id' })
    @ApiBody({ type: _UpdateDto })
    async update(@Param('id') id: string, @Body() data: UpdateDto | [string, UpdateDto]) {
      await this.service.update(...(Array.isArray(data) ? data : [id, data]));
    }

    @EventPattern(`${_Entity.name}.delete`)
    @Delete()
    @ApiOperation(`删除：${_Entity.name}.delete`)
    @ApiBody({ type: IdsDto })
    async delete(@Body() { ids }: IdsDto) {
      await this.service.delete(ids);
    }
  }

  return class extends CrudController {};
}
