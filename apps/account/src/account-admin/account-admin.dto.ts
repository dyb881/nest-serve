import { ApiProperty } from '@app/decorator';
import { PaginationDto } from '@app/dto-tool';
import { AccountAdmin } from './account-admin.entity';
import { AccountBaseQueryDto, AccountBaseCreateDto, AccountBaseUpdateDto } from '../account/account.base.dto';

export class AccountAdminPaginationDto extends PaginationDto(AccountAdmin) {}

export class AccountAdminQueryDto extends AccountBaseQueryDto {
  @ApiProperty('角色', { required: false })
  roles: string;
}

export class AccountAdminCreateDto extends AccountBaseCreateDto {
  @ApiProperty('角色')
  roles: string;
}

export class AccountAdminUpdateDto extends AccountBaseUpdateDto {
  @ApiProperty('角色')
  roles: string;
}
