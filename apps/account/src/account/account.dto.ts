import { PaginationDto } from '@app/dto-tool';
import { ApiPropertyEnum, IsOptional, IsIn } from '@app/decorator';
import { Account, accountType } from './account.entity';
import { AccountBaseQueryDto, AccountBaseCreateDto, AccountBaseUpdateDto } from './account.base.dto';

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
