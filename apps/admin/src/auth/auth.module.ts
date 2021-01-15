import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { jwtModule, cacheModule, httpModule } from 'config/module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    jwtModule(),
    cacheModule(),
    httpModule({ asyncHost: () => process.env.GATEWAY_HOST_ACCOUNT }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
