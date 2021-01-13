import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { IdsDto } from '@app/dto-tool';
import { ApiOperation } from '@app/decorator';
import {
  AccountAdminPaginationDto,
  AccountAdminQueryDto,
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
} from './account-admin.dto';
import { AccountAdmin } from './account-admin.entity';
import { AccountAdminService } from './account-admin.service';
import { LoginDto } from '../account/account.dto';

@ApiTags('管理员账号')
@Controller('admin')
export class AccountAdminController {
  constructor(private readonly accountAdminService: AccountAdminService) {}

  @Post('login')
  @ApiOperation('登录')
  login(@Body() data: LoginDto) {
    return this.accountAdminService.login(data);
  }

  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: AccountAdminPaginationDto })
  findAll(@Query() data: AccountAdminQueryDto) {
    return this.accountAdminService.pagination(data);
  }

  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: AccountAdmin })
  findOne(@Param('id') id: string) {
    return this.accountAdminService.findOne(id);
  }

  @Post()
  @ApiOperation('添加')
  async create(@Body() data: AccountAdminCreateDto) {
    await this.accountAdminService.create(data);
  }

  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: AccountAdminUpdateDto) {
    await this.accountAdminService.update(id, data);
  }

  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() { ids }: IdsDto) {
    await this.accountAdminService.delete(ids);
  }
}
