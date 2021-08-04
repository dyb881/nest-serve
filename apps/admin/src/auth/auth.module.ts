import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthModule } from '@app/public-module';

@Module({
  imports: [
    JwtAuthModule.forRoot({
      token: 'ACCOUNT_SERVICE',
      pattern: 'AccountAdmin.login',
      picks: ['username'],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
