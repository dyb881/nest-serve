import { ApiProperty } from '@app/public-decorator';
import { AccountAdmin } from 'apps/account/src/admin/admin.entity';
import { AdminRole } from 'apps/account/src/admin-role/admin-role.entity';

/**
 * 管理员账号信息
 */
export class AdminInfoDto extends AccountAdmin {
  @ApiProperty('角色信息')
  role: AdminRole;
}

/**
 * 管理员登录返回信息
 */
export class AdminLoginInfoDto extends AdminInfoDto {
  @ApiProperty('headers.Authorization="Bearer ${access_token}" 用于鉴权')
  access_token: string;
}
