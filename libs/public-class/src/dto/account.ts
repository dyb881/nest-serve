import { ApiProperty, ToUndefined, ToDate, IsOptional, IsDate, ValidatorAccount } from '@app/public-decorator';
import { PaginationQueryDto } from './common';

/**
 * 查询分页对象
 * 账号常用
 */
export class AccountPaginationQueryDto extends PaginationQueryDto {
  @ApiProperty('用户名', { required: false })
  username?: string;

  @ApiProperty('手机号', { required: false })
  phone?: string;

  @ApiProperty('昵称', { required: false })
  nickname?: string;
}

/**
 * 创建账号对象
 */
export class AccountCreateDto {
  @ValidatorAccount.USERNAME
  @ApiProperty('用户名')
  username: string;

  @ValidatorAccount.PASSWORD
  @ApiProperty('密码')
  password: string;

  @ToUndefined()
  @IsOptional()
  @ValidatorAccount.PHONE
  @ApiProperty('手机号', { required: false })
  phone?: string;

  @ValidatorAccount.NICKNAME
  @ApiProperty('昵称')
  nickname: string;

  @ApiProperty('头像', { required: false })
  avatar?: string;

  @IsOptional()
  @ValidatorAccount.IP
  @ApiProperty('注册IP', { required: false })
  reg_ip?: string;
}

/**
 * 更新账号对象
 */
export class AccountUpdateDto {
  @ToUndefined()
  @IsOptional()
  @ValidatorAccount.PHONE
  @ApiProperty('手机号', { required: false })
  phone?: string;

  @ValidatorAccount.NICKNAME
  @ApiProperty('昵称')
  nickname: string;

  @ApiProperty('头像', { required: false })
  avatar?: string;

  @IsOptional()
  @ValidatorAccount.PASSWORD
  @ApiProperty('密码', { required: false })
  password?: string;

  @IsOptional()
  @ValidatorAccount.IP
  @ApiProperty('登录IP', { required: false })
  login_ip?: string;

  @ToDate()
  @IsOptional()
  @IsDate('登录时间')
  @ApiProperty('登录时间', { required: false })
  login_date?: Date;
}

/**
 * 账号登录对象
 */
export class AccountLoginDto {
  @ValidatorAccount.USERNAME
  @ApiProperty('用户名')
  username: string;

  @ValidatorAccount.PASSWORD
  @ApiProperty('密码')
  password: string;
}
