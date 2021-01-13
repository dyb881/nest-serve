import { PaginationQueryDto } from '@app/dto-tool';
import { ApiProperty, ApiPropertyEnum, Matches, IsOptional, IsIn, IsDate, ToNumber, ToDate } from '@app/decorator';
import { accountStatus } from './account.entity';
import { matchesArgs } from 'config/regExp.config';

export const username = Matches(...matchesArgs.username);
export const password = Matches(...matchesArgs.password);
export const nickname = Matches(...matchesArgs.nickname);
export const phone = Matches(...matchesArgs.phone);
export const ip = Matches(...matchesArgs.ip);
export const status = IsIn(accountStatus, '状态');

export class AccountBaseQueryDto extends PaginationQueryDto {
  @ApiProperty('用户名', { required: false })
  username?: string;

  @ApiProperty('手机号', { required: false })
  phone?: string;

  @ApiProperty('昵称', { required: false })
  nickname?: string;

  @ToNumber()
  @IsOptional()
  @status
  @ApiPropertyEnum('状态', accountStatus, { required: false })
  status?: number;
}

export class AccountBaseCreateDto {
  @username
  @ApiProperty('用户名')
  username: string;

  @password
  @ApiProperty('密码')
  password: string;

  @IsOptional()
  @phone
  @ApiProperty('手机号', { required: false })
  phone?: string;

  @nickname
  @ApiProperty('昵称')
  nickname: string;

  @ApiProperty('头像', { required: false })
  avatar?: string;

  @IsOptional()
  @ip
  @ApiProperty('注册IP', { required: false })
  reg_ip?: string;

  @status
  @ApiPropertyEnum('状态', accountStatus)
  status: number;
}

export class AccountBaseUpdateDto {
  @IsOptional()
  @phone
  @ApiProperty('手机号', { required: false })
  phone?: string;

  @nickname
  @ApiProperty('昵称')
  nickname: string;

  @ApiProperty('头像', { required: false })
  avatar?: string;

  @IsOptional()
  @password
  @ApiProperty('密码', { required: false })
  password?: string;

  @IsOptional()
  @ip
  @ApiProperty('登录IP', { required: false })
  login_ip?: string;

  @ToDate()
  @IsOptional()
  @IsDate('登录时间')
  @ApiProperty('登录时间', { required: false })
  login_date?: Date;

  @status
  @ApiPropertyEnum('状态', accountStatus)
  status: number;
}
