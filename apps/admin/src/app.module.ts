import { Module } from '@nestjs/common';
import { GlobalModule } from '@app/public-module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    GlobalModule.forRoot({ yamlFilePath: ['apps/admin.yaml'], microservice: ['ACCOUNT_SERVICE'] }),
    AccountModule,
  ],
})
export class AppModule {}
