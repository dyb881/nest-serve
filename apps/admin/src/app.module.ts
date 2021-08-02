import { Module } from '@nestjs/common';
import { GlobalModule } from '@app/public-module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [GlobalModule.forRoot({ yamlFilePath: ['apps/admin.yaml'] }), AccountModule],
})
export class AppModule {}
