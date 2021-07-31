import { Entity } from 'typeorm';
import { AccountEntity } from '@app/public-class';

/**
 * 数据实体
 */
@Entity()
export class AccountUser extends AccountEntity {}
