import { Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { sha512 } from 'js-sha512';
import {
  CommonEntity,
  Column,
  ColumnEnum,
  createTransformer,
  dateTransformer,
  accountType,
  accountStatus,
} from '../../common';

/**
 * 帐号
 */
@Entity()
export class Account extends CommonEntity {
  @Column('用户名', 32, { unique: true })
  username: string;

  @Exclude()
  @Column('密码', 128, { transformer: createTransformer({ to: sha512 }) })
  password: string;

  @Column('昵称', 32)
  nickname: string;

  @Column('注册IP', 15)
  reg_ip: string;

  @Column('登录IP', 15, { nullable: true })
  login_ip: string;

  @Column('登录时间', { transformer: dateTransformer, nullable: true })
  login_date: Date;

  @ColumnEnum('帐号类型', accountType)
  type: string;

  @ColumnEnum('状态', accountStatus)
  status: number;
}
