import { PaginationDto, AccountPaginationQueryDto, AccountCreateDto, AccountUpdateDto } from '@app/public-class';
import { AccountUser } from './user.entity';

/**
 * 分页数据
 */
export class AccountUserPaginationDto extends PaginationDto(AccountUser) {}

/**
 * 查询分页对象
 */
export class AccountUserPaginationQueryDto extends AccountPaginationQueryDto {}

/**
 * 创建数据对象
 */
export class AccountUserCreateDto extends AccountCreateDto {}

/**
 * 编辑数据对象
 */
export class AccountUserUpdateDto extends AccountUpdateDto {}
