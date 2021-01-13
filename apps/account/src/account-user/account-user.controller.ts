import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { IdsDto } from '@app/dto-tool';
import { ApiOperation } from '@app/decorator';
import {
  AccountUserPaginationDto,
  AccountUserQueryDto,
  AccountUserCreateDto,
  AccountUserUpdateDto,
} from './account-user.dto';
import { AccountUser } from './account-user.entity';
import { AccountUserService } from './account-user.service';
import { LoginDto } from '../account/account.dto';

@ApiTags('用户账号')
@Controller('user')
export class AccountUserController {
  constructor(private readonly accountUserService: AccountUserService) {}

  @Post('login')
  @ApiOperation('登录')
  login(@Body() data: LoginDto) {
    return this.accountUserService.login(data);
  }

  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: AccountUserPaginationDto })
  findAll(@Query() data: AccountUserQueryDto) {
    return this.accountUserService.pagination(data);
  }

  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: AccountUser })
  findOne(@Param('id') id: string) {
    return this.accountUserService.findOne(id);
  }

  @Post()
  @ApiOperation('添加')
  async create(@Body() data: AccountUserCreateDto) {
    await this.accountUserService.create(data);
  }

  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: AccountUserUpdateDto) {
    await this.accountUserService.update(id, data);
  }

  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() { ids }: IdsDto) {
    await this.accountUserService.delete(ids);
  }
}
