import { Controller, Get, Post, Put, Delete, Query, Param, Body, Ip } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AccountQueryDto, AccountCreateDto, AccountUpdateDto } from './account.dto';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { DeleteDto, toIp, ApiOperation, PaginationDto, JwtAdmin } from '../../common';

@JwtAdmin()
@ApiTags('账号')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: class AccountPaginationDto extends PaginationDto(Account) {} })
  findAll(@Query() data: AccountQueryDto) {
    return this.accountService.pagination(data);
  }

  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: Account })
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Post()
  @ApiOperation('添加')
  async create(@Body() data: AccountCreateDto, @Ip() ip) {
    await this.accountService.create({ ...data, reg_ip: toIp(ip) });
  }

  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: AccountUpdateDto) {
    await this.accountService.update(id, data);
  }

  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() { ids }: DeleteDto) {
    await this.accountService.delete(ids);
  }
}
