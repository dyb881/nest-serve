import { Column } from 'typeorm';
import { CommonEntity, commonColumn } from './common';
import { Exclude } from 'class-transformer';
import { sha512 } from 'js-sha512';

export class AccountEntity extends CommonEntity {
  @Column({ comment: '用户名', length: 32, unique: true })
  username: string;

  @Exclude()
  @Column({
    comment: '密码',
    length: 128,
    transformer: { to: sha512, from: value => value },
  })
  password: string;

  @Column({ comment: '昵称', length: 32 })
  nickname: string;

  @Column({ comment: '注册IP', ...commonColumn.ip })
  reg_ip: string;

  @Column({ comment: '登录IP', ...commonColumn.ip, nullable: true })
  login_ip: string;

  @Column({
    comment: '登录时间',
    type: 'datetime',
    nullable: true,
    ...commonColumn.date,
  })
  login_date: number;

  @Column({
    comment: '状态，0未审核，1已审核，2冻结',
    enum: [0, 1, 2],
    type: 'enum',
    default: 0,
  })
  status: number;
}
