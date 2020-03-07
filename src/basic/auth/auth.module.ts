import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { AccountModule } from '../account/account.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from '../../common';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: jwtConstants.secret, signOptions: { expiresIn: '36000s' } }),
    UploadFileModule,
    AccountModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
