import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { IdsDto } from '@app/public-class';

/**
 * 增刪查改控制器
 */
export function CrudController<CreateDto = any, UpdateDto = any, Entity extends Function = any>(_Entity: Entity) {
  class CrudController {
    constructor(readonly service: any) {}

    @Get('all')
    @ApiOperation('查询所有')
    @ApiResponse({ status: 200, type: [_Entity] })
    getMany() {
      return this.service.getMany();
    }

    @Get(':id')
    @ApiOperation('查询详情')
    @ApiResponse({ status: 200, type: _Entity })
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }

    @Post()
    @ApiOperation('添加')
    async create(@Body() data: CreateDto) {
      await this.service.create(data);
    }

    @Put(':id')
    @ApiOperation('编辑')
    async update(@Param('id') id: string, @Body() data: UpdateDto) {
      await this.service.update(id, data);
    }

    @Delete()
    @ApiOperation('删除')
    async deletes(@Body() { ids }: IdsDto) {
      await this.service.delete(ids);
    }
  }

  return class extends CrudController {};
}
