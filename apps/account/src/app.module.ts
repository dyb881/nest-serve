import { Module } from '@nestjs/common';
import { GlobalModule } from '@app/public-module';
import { AccountAdminModule } from './admin/admin.module';
import { AccountUserModule } from './user/user.module';

@Module({
  imports: [
    GlobalModule.forRoot({ yamlFilePath: ['apps/account.yaml'], typeorm: true }),
    AccountAdminModule, // 管理员账号
    AccountUserModule, // 用户账号
  ],
})
export class AppModule {}
