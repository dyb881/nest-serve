import { Entity } from 'typeorm';
import { AccountEntity } from '../../common';

/**
 * 用户
 */
@Entity()
export class User extends AccountEntity {}
