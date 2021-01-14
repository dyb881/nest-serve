import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { IdsDto } from '@app/dto-tool';
import { RoleAdminService } from './role-admin.service';
import { RoleAdminCreateDto, RoleAdminUpdateDto } from './role-admin.dto';
import { RoleAdmin } from './role-admin.entity';

@ApiTags('管理员角色')
@Controller('role-admin')
export class RoleAdminController {
  constructor(private readonly roleAdminService: RoleAdminService) {}

  @Get()
  @ApiOperation('查询所有')
  @ApiResponse({ status: 200, type: [RoleAdmin] })
  findAll() {
    return this.roleAdminService.findAll({});
  }

  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: RoleAdmin })
  findOne(@Param('id') id: string) {
    return this.roleAdminService.findOne(id);
  }

  @Post()
  @ApiOperation('添加')
  async create(@Body() data: RoleAdminCreateDto) {
    await this.roleAdminService.create(data);
  }

  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: RoleAdminUpdateDto) {
    await this.roleAdminService.update(id, data);
  }

  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() { ids }: IdsDto) {
    await this.roleAdminService.delete(ids);
  }
}
