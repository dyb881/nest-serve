import { Controller, UseGuards, Post, Get, Req } from '@nestjs/common';
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

  @Post()
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: authDto })
  @ApiResponse({ status: 200, type: tokenDto })
  @ApiOperation({ summary: '登录' })
  async login(@Req() req) {
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
