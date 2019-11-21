import { Entity } from 'typeorm';
import { AccountEntity } from '../../common';

@Entity('admin')
export class AdminEntity extends AccountEntity {}
