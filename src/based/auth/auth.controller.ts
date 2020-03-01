import { Controller, UseGuards, Post, Get, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { authDto, tokenDto } from './auth.dto';

@ApiTags('鉴权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: authDto })
  @ApiResponse({ status: 200, type: tokenDto })
  @ApiOperation({ summary: '登录' })
  async login(@Req() req) {
    return this.authService.getToken(req.user);
  }
}
