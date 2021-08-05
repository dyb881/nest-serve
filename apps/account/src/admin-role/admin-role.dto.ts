import { ApiProperty, IsNotEmpty } from '@app/public-decorator';

/**
 * 查询列表对象
 */
export class AdminRoleQueryDto {
  @ApiProperty('角色名称', { required: false })
  name?: string;
}

/**
 * 创建数据对象
 */
export class AdminRoleCreateDto {
  @IsNotEmpty('角色名称')
  @ApiProperty('角色名称')
  name: string;

  @IsNotEmpty('权限配置')
  @ApiProperty('权限配置')
  permissions: any;
}

/**
 * 编辑数据对象
 */
export class AdminRoleUpdateDto extends AdminRoleCreateDto {}
