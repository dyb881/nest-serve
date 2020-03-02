import { Controller, UseGuards, Post, Get, Param, Req, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { authDto, tokenDto } from './auth.dto';
import { AccountDto } from '../account/account.dto';
import { AccountService } from '../account/account.service';

@ApiTags('鉴权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly accountService: AccountService) {}

  @Post(':accountType')
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: authDto })
  @ApiResponse({ status: 200, type: tokenDto })
  @ApiOperation({ summary: '登录，目前支持帐号类型: admin、user' })
  async login(@Param('accountType') accountType: string, @Req() req) {
    const { type, status } = req.user;
    if (accountType !== type) throw new UnauthorizedException('登录失败');
    if (status !== 1) throw new UnauthorizedException({ 0: '该账号未审核', 2: '该账号已冻结' }[status]);
    return this.authService.getToken(req.user);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, type: AccountDto })
  @ApiOperation({ summary: '获取帐号信息' })
  async getInfo(@Req() req) {
    const { id } = req.user;
    return this.accountService.findOne({ id });
  }
}
