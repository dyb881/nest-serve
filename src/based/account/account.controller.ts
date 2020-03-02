import { Controller, UseGuards, Post, Get, Put, Delete, Query, Param, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from './account.service';
import { QueryAccountDto, CreateAccountDto, UpdateAccountDto, AccountDto, AccountPaginationDto } from './account.dto';
import { getIp } from '../../common';
import { AdminGuard } from '../auth/guard/permissions.guard';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('账号')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiOperation({ summary: '查询列表' })
  @ApiResponse({ status: 200, type: AccountPaginationDto })
  findAll(@Query() data: QueryAccountDto) {
    return this.accountService.findAndCount(data);
  }

  @Get(':id')
  @ApiOperation({ summary: '查询详情' })
  @ApiResponse({ status: 200, type: AccountDto })
  findOne(@Param('id') id: string) {
    return this.accountService.findOne({ id });
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
