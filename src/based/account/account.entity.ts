import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { CommonEntity, columnOptions } from '../../common';
import { ApiProperty } from '@nestjs/swagger';
import { sha512 } from 'js-sha512';

const { date, createEnum } = columnOptions;

const statusOptions = createEnum('状态', ['未审核', '已审核', '冻结']);
export const { enum: statusEnum, comment: statusComment } = statusOptions;

const typeOptions = createEnum('帐号类型', { admin: '管理员', user: '用户' });
export const { enum: typeEnum, comment: typeComment } = typeOptions;

/**
 * 帐号
 */
@Entity()
export class Account extends CommonEntity {
  @Column({ comment: '用户名', length: 32, unique: true })
  username: string;

  @Exclude()
  @Column({ comment: '密码', length: 128, transformer: { to: sha512, from: value => value } })
  password: string;

  @Column({ comment: '昵称', length: 32 })
  nickname: string;

  @Column('enum', typeOptions)
  type: string;

  @Column({ comment: '注册IP', length: 15 })
  reg_ip: string;

  @Column({ comment: '登录IP', length: 15, nullable: true })
  login_ip: string;

  @Column({ comment: '登录时间', ...date, nullable: true })
  login_date: Date;

  @Column('enum', statusOptions)
  status: number;
}
