import { ApiProperty } from '@app/decorator';
import { LoginInfoDto } from 'apps/account/src/account/account.dto';
import { AccountAdmin } from 'apps/account/src/account-admin/account-admin.entity';
import { RoleAdmin } from 'apps/account/src/role-admin/role-admin.entity';

export class AdminLoginInfoDto extends LoginInfoDto(AccountAdmin) {
  @ApiProperty('角色信息')
  role: RoleAdmin;
}

export class AdminInfoDto extends AccountAdmin {
  @ApiProperty('角色信息')
  role: RoleAdmin;
}
