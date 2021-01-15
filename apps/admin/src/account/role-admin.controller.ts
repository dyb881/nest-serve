import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { HttpService } from '@app/http';
import { IdsDto } from '@app/dto-tool';
import { RoleAdminCreateDto, RoleAdminUpdateDto } from 'apps/account/src/role-admin/role-admin.dto';
import { RoleAdmin } from 'apps/account/src/role-admin/role-admin.entity';
import { JwtPermissions, Permissions } from '../jwt.guard';
import fs from 'fs';

@JwtPermissions()
@ApiTags('管理员角色')
@Controller('role-admin')
export class RoleAdminController {
  api = '/role-admin';

  constructor(private readonly httpService: HttpService) {}

  @Permissions('account.roleAdmin.update')
  @Get('default-config')
  @ApiOperation('获取默认权限配置')
  getDefaultConfig() {
    const data = fs.readFileSync('config/jwt.config.json');
    return JSON.parse(data.toString());
  }

  @Permissions('account.roleAdmin.query')
  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: [RoleAdmin] })
  findAll() {
    return this.httpService.get(this.api);
  }

  @Permissions('account.roleAdmin.query')
  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: RoleAdmin })
  findOne(@Param('id') id: string) {
    return this.httpService.get(`${this.api}/${id}`);
  }

  @Permissions('account.roleAdmin.create')
  @Post()
  @ApiOperation('添加')
  async create(@Body() data: RoleAdminCreateDto) {
    await this.httpService.post(this.api, data);
  }

  @Permissions('account.roleAdmin.update')
  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: RoleAdminUpdateDto) {
    await this.httpService.put(`${this.api}/${id}`, data);
  }

  @Permissions('account.roleAdmin.delete')
  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() data: IdsDto) {
    await this.httpService.del(this.api, data);
  }
}
