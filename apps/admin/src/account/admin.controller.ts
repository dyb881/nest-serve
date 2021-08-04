import { Inject, Controller, Get, Post, Put, Delete, Query, Param, Body, Req } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { JwtPermissions, Permissions } from '@app/public-module';
import { ApiOperation } from '@app/public-decorator';
import { IdsDto } from '@app/public-class';
import { toIp } from '@app/public-tool';
import { AccountAdmin } from 'apps/account/src/admin/admin.entity';
import {
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminPaginationQueryDto,
  AccountAdminPaginationDto,
} from 'apps/account/src/admin/admin.dto';

@JwtPermissions()
@ApiTags('管理员账号')
@Controller('account/admin')
export class AccountAdminController {
  constructor(@Inject('ACCOUNT_SERVICE') private readonly client: ClientProxy) {}

  @Permissions('account.admin.query')
  @Get()
  @ApiOperation('查询分页列表')
  @ApiResponse({ status: 200, type: AccountAdminPaginationDto })
  findAll(@Query() data: AccountAdminPaginationQueryDto) {
    return this.client.send(`${AccountAdmin.name}.get.pagination`, data);
  }

  @Permissions('account.admin.query')
  @Get('all')
  @ApiOperation('查询所有')
  @ApiResponse({ status: 200, type: [AccountAdmin] })
  getMany() {
    return this.client.send(`${AccountAdmin.name}.get.all`, {});
  }

  @Permissions('account.admin.query')
  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: AccountAdmin })
  findOne(@Param('id') id: string) {
    return this.client.send(`${AccountAdmin.name}.get.one`, id);
  }

  @Permissions('account.admin.create')
  @Post()
  @ApiOperation('添加')
  async create(@Body() data: AccountAdminCreateDto, @Req() req) {
    return this.client.send(`${AccountAdmin.name}.create`, { ...data, reg_ip: toIp(req.clientIp) });
  }

  @Permissions('account.admin.update')
  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: AccountAdminUpdateDto) {
    return this.client.send(`${AccountAdmin.name}.update`, { id, ...data });
  }

  @Permissions('account.admin.delete')
  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() data: IdsDto) {
    return this.client.send(`${AccountAdmin.name}.delete`, data);
  }
}
