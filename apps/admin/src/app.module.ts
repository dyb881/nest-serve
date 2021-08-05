import { Module } from '@nestjs/common';
import { GlobalModule } from '@app/public-module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { InfosModule } from './infos/infos.module';

@Module({
  imports: [
    GlobalModule.forRoot({
      yamlFilePath: ['apps/admin.yaml'],
      microservice: ['ACCOUNT_SERVICE', 'INFOS_SERVICE'],
      cache: true,
    }),
    AuthModule,
    AccountModule,
    InfosModule,
  ],
})
export class AppModule {}
