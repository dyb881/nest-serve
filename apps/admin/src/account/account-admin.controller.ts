import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { HttpService } from '@app/http';
import { IdsDto } from '@app/dto-tool';
import {
  AccountAdminPaginationDto,
  AccountAdminQueryDto,
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
} from 'apps/account/src/account-admin/account-admin.dto';
import { AccountAdmin } from 'apps/account/src/account-admin/account-admin.entity';

@ApiTags('管理员账号')
@Controller('account-admin')
export class AccountAdminController {
  api = '/admin';

  constructor(private readonly httpService: HttpService) {}

  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: AccountAdminPaginationDto })
  findAll(@Query() data: AccountAdminQueryDto) {
    return this.httpService.get(this.api, data);
  }

  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: AccountAdmin })
  findOne(@Param('id') id: string) {
    return this.httpService.get(`${this.api}/${id}`);
  }

  @Post()
  @ApiOperation('添加')
  async create(@Body() data: AccountAdminCreateDto) {
    await this.httpService.post(this.api, data);
  }

  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: AccountAdminUpdateDto) {
    await this.httpService.put(`${this.api}/${id}`, data);
  }

  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() data: IdsDto) {
    await this.httpService.del(this.api, data);
  }
}
