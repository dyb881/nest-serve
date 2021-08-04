import { Module } from '@nestjs/common';
import { GlobalModule } from '@app/public-module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GlobalModule.forRoot({
      yamlFilePath: ['apps/admin.yaml'],
      microservice: ['ACCOUNT_SERVICE'],
      cache: true,
      jwt: true,
    }),
    AccountModule,
    AuthModule,
  ],
})
export class AppModule {}
