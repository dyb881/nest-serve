import { Module } from '@nestjs/common';
import { CommonModule } from './common';
import { AccountModule } from './account/account.module';
import { InfosModule } from './infos/infos.module';

@Module({
  imports: [
    CommonModule, // 公共模块
    AccountModule, // 帐号模块
    InfosModule, // 信息模块
  ],
})
export class AppModule {}
