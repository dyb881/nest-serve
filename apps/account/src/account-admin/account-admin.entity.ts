import { Entity } from 'typeorm';
import { Column, ApiProperty } from '@app/decorator';
import { AccountBase } from '../account/account.entity';

@Entity()
export class AccountAdmin extends AccountBase {
  @ApiProperty('角色')
  @Column('角色')
  roles: string;
}
