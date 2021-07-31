import { Controller, Post, Get, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { AccountLoginDto, PaginationController } from '@app/public-class';
import { AccountAdminService } from './admin.service';
import { AccountAdmin, ACCOUNT_ADMIN_STATUS } from './admin.entity';
import {
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminPaginationQueryDto,
  AccountAdminPaginationDto,
} from './admin.dto';
import { AliSmsService } from '@app/public-module';

@ApiTags('管理员账号')
@Controller('admin')
export class AccountAdminController extends PaginationController(
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdmin,
  AccountAdminPaginationQueryDto,
  AccountAdminPaginationDto
) {
  constructor(private readonly accountAdminService: AccountAdminService, readonly aliSmsService: AliSmsService) {
    super(accountAdminService);
  }

  @Post('login')
  @ApiOperation('登录')
  login(@Body() data: AccountLoginDto) {
    return this.accountAdminService.login(data, (one: AccountAdmin) => {
      if (one.status !== 1) throw new UnauthorizedException(`账号${ACCOUNT_ADMIN_STATUS[one.status]}`);
    });
  }

  @Get('send')
  @ApiOperation('发送短信')
  async send() {
    await this.aliSmsService.send({
      signName: '测试专用',
      templateCode: 'SMS_43200124',
      templateParam: { name: '123456' },
      phoneNumbers: '151189955171',
    });
  }
}
