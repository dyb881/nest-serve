import { Inject, Controller, Post, Body, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { JwtPermissions, Permissions } from '@app/public-module';
import { ApiOperation } from '@app/public-decorator';
import { PaginationClientController } from '@app/public-class';
import { AccountUser } from 'apps/account/src/user/user.entity';
import {
  AccountUserCreateDto,
  AccountUserUpdateDto,
  AccountUserPaginationQueryDto,
  AccountUserPaginationDto,
} from 'apps/account/src/user/user.dto';

const PERMISSIONS = 'account.user';

@JwtPermissions()
@ApiTags('用户账号')
@Controller('account/user')
export class AccountUserController extends PaginationClientController(
  PERMISSIONS,
  AccountUser,
  AccountUserCreateDto,
  AccountUserUpdateDto,
  AccountUserPaginationQueryDto,
  AccountUserPaginationDto
) {
  constructor(@Inject('ACCOUNT_SERVICE') readonly client: ClientProxy) {
    super(client);
  }

  @Permissions(`${PERMISSIONS}.create`)
  @Post()
  @ApiOperation('添加')
  create(@Body() data: AccountUserCreateDto, @Req() req) {
    return super.create({ ...data, reg_ip: req.clientIp });
  }
}
