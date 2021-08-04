import { Controller, UseGuards, Post, Get, Req } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AccountLoginDto } from '@app/public-class';
import { ApiOperation } from '@app/public-decorator';
import { AuthService } from './auth.service';
import { AdminLoginInfoDto, AdminInfoDto } from './auth.dto';

@ApiTags('鉴权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: AccountLoginDto })
  @ApiResponse({ status: 200, type: AdminLoginInfoDto })
  @ApiOperation('登录')
  login(@Req() req) {
    return this.authService.login(req);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, type: AdminInfoDto })
  @ApiOperation('获取帐号信息')
  getInfo(@Req() req) {
    return this.authService.getInfo(req.user.id);
  }
}
