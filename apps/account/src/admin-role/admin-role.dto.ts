import { ApiProperty, IsNotEmpty } from '@app/public-decorator';

export class AdminRoleCreateDto {
  @IsNotEmpty('角色名称')
  @ApiProperty('角色名称')
  name: string;

  @IsNotEmpty('权限配置')
  @ApiProperty('权限配置')
  permissions: any;
}

export class AdminRoleUpdateDto extends AdminRoleCreateDto {}
