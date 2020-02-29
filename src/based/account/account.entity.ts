import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { CommonEntity, columnOptions } from '../../common';
const { date, password, createEnum } = columnOptions;

const statusOptions = createEnum('状态', ['未审核', '已审核', '冻结']);
export const { enum: statusEnum, comment: statusComment } = statusOptions;

/**
 * 帐号
 */
@Entity()
export class Account extends CommonEntity {
  @Column({ comment: '用户名', length: 32, unique: true })
  username: string;

  @Column({ comment: '密码', ...password })
  @Exclude()
  password: string;

  @Column({ comment: '昵称', length: 32 })
  nickname: string;

  @Column({ comment: '注册IP', length: 15 })
  reg_ip: string;

  @Column({ comment: '登录IP', length: 15, nullable: true })
  login_ip: string;

  @Column({ comment: '登录时间', ...date, nullable: true })
  login_date: Date;

  @Column('enum', statusOptions)
  status: number;
}
