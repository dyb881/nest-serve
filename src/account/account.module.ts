import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { RoleModule } from './role/role.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

const imports = [RoleModule, AdminModule, UserModule, AuthModule];

@Module({
  imports: [
    ...imports,
    
    // 路由前缀定义
    RouterModule.register([{ path: 'account', children: imports }]),
  ],
})
export class AccountModule {}
