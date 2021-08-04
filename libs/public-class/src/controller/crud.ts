import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
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

    @MessagePattern(`${_Entity.name}.get.all`)
    @Get('all')
    @ApiOperation(`查询所有：${_Entity.name}.get.all`)
    @ApiResponse({ status: 200, type: [_Entity] })
    getMany() {
      return this.service.getMany();
    }

    @MessagePattern(`${_Entity.name}.get.one`)
    @Get(':id')
    @ApiOperation(`查询详情：${_Entity.name}.get.one`)
    @ApiResponse({ status: 200, type: _Entity })
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }

    @MessagePattern(`${_Entity.name}.create`)
    @Post()
    @ApiOperation(`添加：${_Entity.name}.create`)
    @ApiBody({ type: _CreateDto })
    async create(@Body() data: CreateDto) {
      await this.service.create(data);
    }

    @MessagePattern(`${_Entity.name}.update`)
    @Put(':id')
    @ApiOperation(`编辑：${_Entity.name}.update`)
    @ApiBody({ type: _UpdateDto })
    async update(@Param('id') id: string, @Body() data: UpdateDto, @Payload() payload?: [string, UpdateDto]) {
      await this.service.update(...(payload || [id, data]));
    }

    @MessagePattern(`${_Entity.name}.delete`)
    @Delete()
    @ApiOperation(`删除：${_Entity.name}.delete`)
    @ApiBody({ type: IdsDto })
    async delete(@Body() { ids }: IdsDto) {
      await this.service.delete(ids);
    }
  }

  return class extends CrudController {};
}
