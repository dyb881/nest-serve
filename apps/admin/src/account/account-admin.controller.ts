import { Controller, Get, Post, Put, Delete, Query, Param, Body, Ip } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { HttpService } from '@app/http';
import { IdsDto } from '@app/dto-tool';
import { toIp } from '@app/data-tool';
import {
  AccountAdminPaginationDto,
  AccountAdminQueryDto,
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
} from 'apps/account/src/account-admin/account-admin.dto';
import { AccountAdmin } from 'apps/account/src/account-admin/account-admin.entity';
import { JwtPermissions, Permissions } from '../jwt.guard';

@JwtPermissions()
@ApiTags('管理员账号')
@Controller('account-admin')
export class AccountAdminController {
  api = '/admin';

  constructor(private readonly httpService: HttpService) {}

  @Permissions('account.admin.query')
  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: AccountAdminPaginationDto })
  findAll(@Query() data: AccountAdminQueryDto) {
    return this.httpService.get(this.api, data);
  }

  @Permissions('account.admin.query')
  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: AccountAdmin })
  findOne(@Param('id') id: string) {
    return this.httpService.get(`${this.api}/${id}`);
  }

  @Permissions('account.admin.create')
  @Post()
  @ApiOperation('添加')
  async create(@Body() data: AccountAdminCreateDto, @Ip() ip) {
    await this.httpService.post(this.api, { ...data, reg_ip: toIp(ip) });
  }

  @Permissions('account.admin.update')
  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: AccountAdminUpdateDto) {
    await this.httpService.put(`${this.api}/${id}`, data);
  }

  @Permissions('account.admin.delete')
  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() data: IdsDto) {
    await this.httpService.del(this.api, data);
  }
}
