import { Controller, Get, Post, Put, Delete, Query, Param, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { IdsDto, AccountLoginDto } from '@app/public-class';
import {
  AccountAdminPaginationDto,
  AccountAdminPaginationQueryDto,
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
} from './admin.dto';
import { AccountAdmin, ACCOUNT_ADMIN_STATUS } from './admin.entity';
import { AccountAdminService } from './admin.service';

@ApiTags('管理员账号')
@Controller('admin')
export class AccountAdminController {
  constructor(private readonly accountAdminService: AccountAdminService) {}

  @Post('login')
  @ApiOperation('登录')
  login(@Body() data: AccountLoginDto) {
    return this.accountAdminService.login(data, (one: AccountAdmin) => {
      if (one.status !== 1) throw new UnauthorizedException(`账号${ACCOUNT_ADMIN_STATUS[one.status]}`);
    });
  }

  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: AccountAdminPaginationDto })
  findAll(@Query() data: AccountAdminPaginationQueryDto) {
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
