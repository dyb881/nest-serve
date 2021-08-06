import { Module } from '@nestjs/common';
import { GlobalModule } from '@app/public-module';
import { AdminRoleModule } from './admin-role/admin-role.module';
import { AccountAdminModule } from './admin/admin.module';
import { AccountUserModule } from './user/user.module';

@Module({
  imports: [
    GlobalModule.forRoot({ yamlFilePath: ['apps/account.yaml'], typeorm: true }),
    AdminRoleModule,
    AccountAdminModule,
    AccountUserModule,
  ],
})
export class AppModule {}
