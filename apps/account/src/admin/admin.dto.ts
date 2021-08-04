import { PaginationDto, AccountPaginationQueryDto, AccountCreateDto, AccountUpdateDto } from '@app/public-class';
import { IsIn, ApiProperty, IsNotEmpty, ToNumber, IsOptional, ApiPropertyEnum } from '@app/public-decorator';
import { ACCOUNT_ADMIN_STATUS, AccountAdmin } from './admin.entity';

/**
 * 属性验证
 */
export const ValidatorAccountAdmin = {
  STATUS: IsIn(ACCOUNT_ADMIN_STATUS, '状态'),
};

/**
 * 分页数据
 */
export class AccountAdminPaginationDto extends PaginationDto(AccountAdmin) {}

/**
 * 查询分页对象
 */
export class AccountAdminPaginationQueryDto extends AccountPaginationQueryDto {
  @ApiProperty('角色', { required: false })
  roleId: string;

  @ToNumber()
  @IsOptional()
  @ValidatorAccountAdmin.STATUS
  @ApiPropertyEnum('状态', ACCOUNT_ADMIN_STATUS, { required: false })
  status?: number;
}

/**
 * 创建数据对象
 */
export class AccountAdminCreateDto extends AccountCreateDto {
  @IsNotEmpty('角色')
  @ApiProperty('角色')
  roleId: string;

  @ValidatorAccountAdmin.STATUS
  @ApiPropertyEnum('状态', ACCOUNT_ADMIN_STATUS)
  status: number;

  reg_ip?: string;
}

/**
 * 编辑数据对象
 */
export class AccountAdminUpdateDto extends AccountUpdateDto {
  @IsNotEmpty('角色')
  @ApiProperty('角色')
  roleId: string;

  @ToNumber()
  @IsOptional()
  @ValidatorAccountAdmin.STATUS
  @ApiPropertyEnum('状态', ACCOUNT_ADMIN_STATUS, { required: false })
  status?: number;
}
