import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { HttpService } from '@app/http';
import { IdsDto } from '@app/dto-tool';
import {
  AccountUserPaginationDto,
  AccountUserQueryDto,
  AccountUserCreateDto,
  AccountUserUpdateDto,
} from 'apps/account/src/account-user/account-user.dto';
import { AccountUser } from 'apps/account/src/account-user/account-user.entity';

@ApiTags('用户账号')
@Controller('account-user')
export class AccountUserController {
  api = '/user';

  constructor(private readonly httpService: HttpService) {}

  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: AccountUserPaginationDto })
  findAll(@Query() data: AccountUserQueryDto) {
    return this.httpService.get(this.api, data);
  }

  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: AccountUser })
  findOne(@Param('id') id: string) {
    return this.httpService.get(`${this.api}/${id}`);
  }

  @Post()
  @ApiOperation('添加')
  async create(@Body() data: AccountUserCreateDto) {
    await this.httpService.post(this.api, data);
  }

  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: AccountUserUpdateDto) {
    await this.httpService.put(`${this.api}/${id}`, data);
  }

  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() data: IdsDto) {
    await this.httpService.del(this.api, data);
  }
}
