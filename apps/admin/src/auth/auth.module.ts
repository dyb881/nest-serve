import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { httpModule } from 'config/module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    httpModule({
      asyncHost: () => process.env.GATEWAY_HOST_ACCOUNT,
    }),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '36000s' } }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
