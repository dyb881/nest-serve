import {
  PaginationQueryDto,
  PaginationDto,
  AccountQueryDto,
  AccountCreateDto,
  AccountUpdateDto,
} from '../../common';
import { User } from './user.entity';

/**
 * 查询条件
 */
export class UserQueryDto extends AccountQueryDto {}

/**
 * 查询分页数据条件
 */
export class UserPaginationQueryDto extends PaginationQueryDto(UserQueryDto) {}

/**
 * 分页数据
 */
export class UserPaginationDto extends PaginationDto(User) {}

/**
 * 创建数据对象
 */
export class UserCreateDto extends AccountCreateDto {}

/**
 * 编辑数据对象
 */
export class UserUpdateDto extends AccountUpdateDto {}
