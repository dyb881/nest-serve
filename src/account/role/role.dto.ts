import { DtoParam, PaginationQueryDto, PaginationDto } from '../../common';
import { Role,Permissions } from './role.entity';

/**
 * 查询列表对象
 */
export class RoleQueryDto {
  @DtoParam('角色名称', { required: false })
  name?: string;
}

/**
 * 查询分页数据条件
 */
export class RolePaginationQueryDto extends PaginationQueryDto(RoleQueryDto) {}

/**
 * 分页数据
 */
export class RolePaginationDto extends PaginationDto(Role) {}

/**
 * 创建数据对象
 */
export class RoleCreateDto {
  @DtoParam('角色名称')
  name: string;

  @DtoParam('权限配置')
  permissions: Permissions;
}

/**
 * 编辑数据对象
 */
export class RoleUpdateDto extends RoleCreateDto {}
