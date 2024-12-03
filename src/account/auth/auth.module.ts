import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';

/**
 * 配置模块
 */
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const { secret, expiresIn } = configService.get('jwt');
        return { global: true, secret, signOptions: { expiresIn } };
      },
      inject: [ConfigService],
    }),
    AdminModule,
    UserModule,
    RoleModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy],
})
export class AuthModule {}
