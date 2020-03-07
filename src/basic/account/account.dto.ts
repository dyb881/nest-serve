import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CommonDto, ApiProperty, ApiPropertyEnum, accountType, accountStatus, PaginationDto, PaginationQueryDto, Matches, IsIn } from '../../common';

export const username = Matches(/^[\d\w-_]{4,32}$/, '请输入正确的用户名，4-32位、字母、数字、下划线、减号');
export const password = Matches(/^[\d\w-_]{4,32}$/, '请输入正确的密码，4-32位、字母、数字、下划线、减号');
export const nickname = Matches(/^[\d\w\u4e00-\u9fa5-_]{2,15}$/, '请输入正确的昵称，2-32位、中文、字母、数字，下划线、减号');
export const type = IsIn(accountType, '请选择正确的帐号类型');
export const status = IsIn(accountStatus, '请选择正确的状态');

export class AccountDto extends CommonDto {
  @ApiProperty('用户名')
  username: string;

  @ApiProperty('昵称')
  nickname: string;

  @ApiProperty('注册IP')
  reg_ip: string;

  @ApiProperty('登录IP')
  login_ip: string;

  @ApiProperty('登录时间')
  login_date: Date;

  @ApiPropertyEnum('帐号类型', accountType)
  type: string;

  @ApiPropertyEnum('状态', accountStatus)
  status: number;
}

export class AccountPaginationDto extends PaginationDto(AccountDto) {}

export class AccountQueryDto extends PaginationQueryDto {
  @ApiProperty('用户名', { required: false })
  username?: string;

  @ApiProperty('昵称', { required: false })
  nickname?: string;

  @IsOptional()
  @type
  @ApiPropertyEnum('帐号类型', accountType, { required: false })
  type?: string;

  @Type(() => Number)
  @IsOptional()
  @status
  @ApiPropertyEnum('状态', accountStatus, { required: false })
  status?: number;
}

export class AccountCreateDto {
  @username
  @ApiProperty('用户名')
  username: string;

  @password
  @ApiProperty('密码')
  password: string;

  @nickname
  @ApiProperty('昵称')
  nickname: string;

  @type
  @ApiPropertyEnum('帐号类型', accountType)
  type: string;

  @status
  @ApiPropertyEnum('状态', accountStatus)
  status: string;
}

export class AccountUpdateDto {
  @IsOptional()
  @password
  @ApiProperty('密码', { required: false })
  password?: string;

  @nickname
  @ApiProperty('昵称')
  nickname: string;

  @IsIn(accountStatus)
  @ApiPropertyEnum('状态', accountStatus)
  status: string;
}
