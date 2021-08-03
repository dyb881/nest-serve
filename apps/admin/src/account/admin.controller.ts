import { Inject, Controller, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { AccountLoginDto } from '@app/public-class';
import 'rxjs';

@ApiTags('管理员账号')
@Controller('admin')
export class AccountAdminController {
  constructor(@Inject('ACCOUNT_SERVICE') private readonly client: ClientProxy) {}

  @Post('login')
  @ApiOperation('登录')
  login(@Body() data: AccountLoginDto) {
    return this.client.send('AccountAdmin.login', data);
  }
}
