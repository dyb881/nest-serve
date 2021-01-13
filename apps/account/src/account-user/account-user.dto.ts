import { PaginationDto } from '@app/dto-tool';
import { AccountUser } from './account-user.entity';
import { AccountBaseQueryDto, AccountBaseCreateDto, AccountBaseUpdateDto } from '../account/account.base.dto';

export class AccountUserPaginationDto extends PaginationDto(AccountUser) {}

export class AccountUserQueryDto extends AccountBaseQueryDto {}

export class AccountUserCreateDto extends AccountBaseCreateDto {}

export class AccountUserUpdateDto extends AccountBaseUpdateDto {}
