import { Entity } from 'typeorm';
import { AccountBase } from '../account/account.entity';

@Entity()
export class AccountUser extends AccountBase {}
