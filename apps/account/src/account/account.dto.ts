import { PaginationDto } from '@app/dto-tool';
import { ApiProperty, ApiPropertyEnum, IsOptional, IsIn } from '@app/decorator';
import { Account, accountType } from './account.entity';
import {
  AccountBaseQueryDto,
  AccountBaseCreateDto,
  AccountBaseUpdateDto,
  username,
  password,
} from './account.base.dto';

export const type = IsIn(accountType, '帐号类型');

export class AccountPaginationDto extends PaginationDto(Account) {}

export class AccountQueryDto extends AccountBaseQueryDto {
  @IsOptional()
  @type
  @ApiPropertyEnum('帐号类型', accountType, { required: false })
  type?: string;
}

export class AccountCreateDto extends AccountBaseCreateDto {
  @type
  @ApiPropertyEnum('帐号类型', accountType)
  type: string;
}

export class AccountUpdateDto extends AccountBaseUpdateDto {}

export class LoginDto {
  @username
  @ApiProperty('用户名')
  username: string;

  @password
  @ApiProperty('密码')
  password: string;
}

export class AuthDto extends LoginDto {}

export function LoginInfoDto(Dto: any) {
  class LoginInfoDto extends Dto {
    @ApiProperty('headers.Authorization="Bearer ${access_token}" 用于鉴权')
    access_token: string;
  }
  return class extends LoginInfoDto {};
}
