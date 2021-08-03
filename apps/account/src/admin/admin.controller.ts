import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
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

@ApiTags('管理员账号')
@Controller('admin')
export class AccountAdminController extends PaginationController(
  AccountAdmin,
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminPaginationQueryDto,
  AccountAdminPaginationDto
) {
  constructor(private readonly accountAdminService: AccountAdminService) {
    super(accountAdminService);
  }

  @MessagePattern(`${AccountAdmin.name}.login`)
  @Post('login')
  @ApiOperation(`登录：${AccountAdmin.name}.login`)
  login(@Body() data: AccountLoginDto) {
    return this.accountAdminService.login(data, (one: AccountAdmin) => {
      if (one.status !== 1) throw new UnauthorizedException(`账号${ACCOUNT_ADMIN_STATUS[one.status]}`);
    });
  }
}
