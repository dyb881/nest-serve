import { Controller, UseGuards, Get, Post, Put, Delete, Query, Param, Body, Req } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AccountDto, AccountPaginationDto, AccountQueryDto, AccountCreateDto, AccountUpdateDto } from './account.dto';
import { AccountService } from './account.service';
import { DeleteDto, getIp, ApiOperation, AdminGuard } from '../../common';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('账号')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: AccountPaginationDto })
  findAll(@Query() data: AccountQueryDto) {
    return this.accountService.pagination(data);
  }

  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: AccountDto })
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Post()
  @ApiOperation('添加')
  async create(@Body() data: AccountCreateDto, @Req() req) {
    await this.accountService.create({ ...data, reg_ip: getIp(req) });
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
