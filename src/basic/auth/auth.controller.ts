import { Controller, UseGuards, Post, Get, Param, Req, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AccountService } from '../account/account.service';
import { AuthDto, LoginInfoDto } from './auth.dto';
import { Account } from '../account/account.entity';
import { ApiOperation, accountTypeList, getIp, format } from '../../common';

@ApiTags('鉴权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly accountService: AccountService) {}

  @Post(':accountType')
  @UseGuards(AuthGuard('local'))
  @ApiParam({ name: 'accountType', enum: accountTypeList, description: '登录帐号类型，admin:管理员、user:用户' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 200, type: LoginInfoDto })
  @ApiOperation('登录')
  async login(@Param('accountType') accountType, @Req() req) {
    const { type, status } = req.user;
    if (accountType !== type) throw new UnauthorizedException('登录失败');
    if (status !== 1) throw new UnauthorizedException({ 0: '该账号未审核', 2: '该账号已冻结' }[status]);
    const account = { ...req.user, login_ip: getIp(req), login_date: format(new Date()) };
    const access_token = this.authService.getToken(req.user);
    await this.accountService.login(account);
    Object.assign(account, { access_token });
    return account;
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, type: Account })
  @ApiOperation('获取帐号信息')
  async getInfo(@Req() req) {
    const { id } = req.user;
    return this.accountService.findOne(id);
  }
}
