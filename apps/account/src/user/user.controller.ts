import { Controller, Post, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { AccountLoginDto, PaginationController } from '@app/public-class';
import { AccountUserService } from './user.service';
import { AccountUser } from './user.entity';
import {
  AccountUserCreateDto,
  AccountUserUpdateDto,
  AccountUserPaginationQueryDto,
  AccountUserPaginationDto,
} from './user.dto';

@ApiTags('用户账号')
@Controller('user')
export class AccountUserController extends PaginationController(
  AccountUser,
  AccountUserCreateDto,
  AccountUserUpdateDto,
  AccountUserPaginationQueryDto,
  AccountUserPaginationDto
) {
  constructor(private readonly accountAdminService: AccountUserService) {
    super(accountAdminService);
  }

  @MessagePattern(`${AccountUser.name}.login`)
  @Post('login')
  @ApiOperation(`登录：${AccountUser.name}.login`)
  login(@Body() data: AccountLoginDto) {
    return this.accountAdminService.login(data);
  }
}
