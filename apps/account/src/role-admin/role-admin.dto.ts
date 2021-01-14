import { ApiProperty, IsNotEmpty } from '@app/decorator';
import { TPermissions } from './role-admin.entity';

export class RoleAdminCreateDto {
  @IsNotEmpty('角色名称')
  @ApiProperty('角色名称')
  name: string;

  @IsNotEmpty('权限配置')
  @ApiProperty('权限配置')
  permissions: TPermissions;
}

export class RoleAdminUpdateDto extends RoleAdminCreateDto {}
