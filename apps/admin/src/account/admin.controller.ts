import { Inject, Controller, Post, Body, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { JwtPermissions, Permissions } from '@app/public-module';
import { ApiOperation } from '@app/public-decorator';
import { PaginationClientController } from '@app/public-class';
import { AccountAdmin } from 'apps/account/src/admin/admin.entity';
import {
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminPaginationQueryDto,
  AccountAdminPaginationDto,
} from 'apps/account/src/admin/admin.dto';

const PERMISSIONS = 'account.admin';

@JwtPermissions()
@ApiTags('管理员账号')
@Controller('account/admin')
export class AccountAdminController extends PaginationClientController(
  PERMISSIONS,
  AccountAdmin,
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminPaginationQueryDto,
  AccountAdminPaginationDto
) {
  constructor(@Inject('ACCOUNT_SERVICE') readonly client: ClientProxy) {
    super(client);
  }

  @Permissions(`${PERMISSIONS}.create`)
  @Post()
  @ApiOperation('添加')
  create(@Body() data: AccountAdminCreateDto, @Req() req) {
    return super.create({ ...data, reg_ip: req.clientIp });
  }
}
