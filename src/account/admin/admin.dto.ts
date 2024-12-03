import {
  DtoParam,
  PaginationQueryDto,
  PaginationDto,
  AccountQueryDto,
  AccountCreateDto,
  AccountUpdateDto,
} from '../../common';
import { ACCOUNT_ADMIN_STATUS, Admin } from './admin.entity';

/**
 * 查询条件
 */
export class AdminQueryDto extends AccountQueryDto {
  @DtoParam('角色', { required: false })
  roleId?: string;

  @DtoParam('状态', { enum: ACCOUNT_ADMIN_STATUS, isInt: true, required: false })
  status?: number;
}

/**
 * 查询分页数据条件
 */
export class AdminPaginationQueryDto extends PaginationQueryDto(AdminQueryDto) {}

/**
 * 分页数据
 */
export class AdminPaginationDto extends PaginationDto(Admin) {}

/**
 * 创建数据对象
 */
export class AdminCreateDto extends AccountCreateDto {
  @DtoParam('角色')
  roleId: string;

  @DtoParam('状态', { enum: ACCOUNT_ADMIN_STATUS, isInt: true })
  status: number;
}

/**
 * 编辑数据对象
 */
export class AdminUpdateDto extends AccountUpdateDto {
  @DtoParam('角色')
  roleId: string;

  @DtoParam('状态', { enum: ACCOUNT_ADMIN_STATUS, isInt: true })
  status: number;
}
