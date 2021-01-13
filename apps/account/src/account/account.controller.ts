import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { IdsDto } from '@app/dto-tool';
import { ApiOperation } from '@app/decorator';
import { AccountPaginationDto, AccountQueryDto, AccountCreateDto, AccountUpdateDto } from './account.dto';
import { Account } from './account.entity';
import { AccountService } from './account.service';

@ApiTags('所有账号')
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
  @ApiResponse({ status: 200, type: Account })
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Post()
  @ApiOperation('添加')
  async create(@Body() data: AccountCreateDto) {
    await this.accountService.create(data);
  }

  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: AccountUpdateDto) {
    await this.accountService.update(id, data);
  }

  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() { ids }: IdsDto) {
    await this.accountService.delete(ids);
  }
}
