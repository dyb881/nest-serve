import { Controller, UseGuards, Post, Get, Req } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@app/decorator';
import { HttpService } from '@app/http';
import { AuthService } from './auth.service';
import { AuthDto, LoginInfoDto } from 'apps/account/src/account/account.dto';
import { AccountAdmin } from 'apps/account/src/account-admin/account-admin.entity';

@ApiTags('鉴权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly httpService: HttpService) {}

  @Post()
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 200, type: class AdminLoginInfoDto extends LoginInfoDto(AccountAdmin) {} })
  @ApiOperation('登录')
  async login(@Req() req) {
    await this.authService.installToken(req.user, req.ip);
    return req.user;
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, type: AccountAdmin })
  @ApiOperation('获取帐号信息')
  getInfo(@Req() req) {
    return this.httpService.get(`/admin/${req.user.id}`);
  }
}
