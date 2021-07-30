import { Controller, Get, Post, Query, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { AccountLoginDto, CrudController } from '@app/public-class';
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
export class AccountAdminController extends CrudController<AccountAdminCreateDto, AccountAdminUpdateDto>(AccountAdmin) {
  constructor(private readonly accountAdminService: AccountAdminService) {
    super(accountAdminService);
  }

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
  pagination(@Query() data: AccountAdminPaginationQueryDto) {
    return this.accountAdminService.pagination(data);
  }
}
