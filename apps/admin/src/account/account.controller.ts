import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { HttpService } from '@app/http';
import { IdsDto } from '@app/dto-tool';
import {
  AccountPaginationDto,
  AccountQueryDto,
  AccountCreateDto,
  AccountUpdateDto,
} from 'apps/account/src/account/account.dto';
import { Account } from 'apps/account/src/account/account.entity';
import { JwtPermissions, Permissions } from '../jwt.guard';

@JwtPermissions()
@ApiTags('所有账号')
@Controller('account')
export class AccountController {
  api = '/account';

  constructor(private readonly httpService: HttpService) {}

  @Permissions('account.account.query')
  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: AccountPaginationDto })
  findAll(@Query() data: AccountQueryDto) {
    return this.httpService.get(this.api, data);
  }

  @Permissions('account.account.query')
  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: Account })
  findOne(@Param('id') id: string) {
    return this.httpService.get(`${this.api}/${id}`);
  }

  @Permissions('account.account.create')
  @Post()
  @ApiOperation('添加')
  async create(@Body() data: AccountCreateDto) {
    await this.httpService.post(this.api, data);
  }

  @Permissions('account.account.update')
  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: AccountUpdateDto) {
    await this.httpService.put(`${this.api}/${id}`, data);
  }

  @Permissions('account.account.delete')
  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() data: IdsDto) {
    await this.httpService.del(this.api, data);
  }
}
