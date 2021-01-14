import { ApiProperty, IsNotEmpty } from '@app/decorator';
import { PaginationDto } from '@app/dto-tool';
import { AccountAdmin } from './account-admin.entity';
import { AccountBaseQueryDto, AccountBaseCreateDto, AccountBaseUpdateDto } from '../account/account.base.dto';

export class AccountAdminPaginationDto extends PaginationDto(AccountAdmin) {}

export class AccountAdminQueryDto extends AccountBaseQueryDto {
  @ApiProperty('角色', { required: false })
  roleId: string;
}

export class AccountAdminCreateDto extends AccountBaseCreateDto {
  @IsNotEmpty('角色')
  @ApiProperty('角色')
  roleId: string;
}

export class AccountAdminUpdateDto extends AccountBaseUpdateDto {
  @IsNotEmpty('角色')
  @ApiProperty('角色')
  roleId: string;
}
