import { Controller, Post, Get, Put, Delete, Query, Param, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { QueryAccountDto, CreateAccountDto, UpdateAccountDto } from './account.dto';
import { getIp } from '../../common';

@ApiTags('账号')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiOperation({ summary: '查询列表' })
  findAll(@Query() queryData: QueryAccountDto) {
    return this.accountService.findAll(queryData);
  }

  @Get(':id')
  @ApiOperation({ summary: '查询详情' })
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '添加' })
  async create(@Body() data: CreateAccountDto, @Req() req) {
    await this.accountService.create({ ...data, reg_ip: getIp(req) });
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑' })
  async update(@Param('id') id: string, @Body() data: UpdateAccountDto) {
    await this.accountService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  async remove(@Param('id') id: string) {
    await this.accountService.remove(id);
  }
}
