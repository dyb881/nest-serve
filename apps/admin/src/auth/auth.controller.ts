import { Controller, UseGuards, Post, Get, Req } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@app/decorator';
import { AuthService } from './auth.service';
import { AuthDto } from 'apps/account/src/account/account.dto';
import { AdminLoginInfoDto, AdminInfoDto } from './auth.dto';

@ApiTags('鉴权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 200, type: AdminLoginInfoDto })
  @ApiOperation('登录')
  async login(@Req() req) {
    const access_token = await this.authService.getToken(req.user);
    this.authService.saveLogin(req.user.account, req.ip);
    const role = await this.authService.getRole(req);
    return { ...req.user, access_token, role };
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, type: AdminInfoDto })
  @ApiOperation('获取帐号信息')
  async getInfo(@Req() req) {
    const admin = await this.authService.getAdmin(req.user.id);
    const role = await this.authService.getRole(req);
    return { ...admin, role };
  }
}
