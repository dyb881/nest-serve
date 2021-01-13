import { Entity, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Column, ColumnEnum, ApiProperty, ApiPropertyEnum } from '@app/decorator';
import { CommonEntity } from '@app/entity-tool';
import { createTransformer, dateTransformer } from '@app/data-tool';
import { sha512 } from 'js-sha512';

/**
 * 帐号类型
 */
export const accountType = { admin: '管理员', user: '用户' };

/**
 * 账号状态
 */
export const accountStatus = ['未审核', '已审核', '已冻结'];

@Entity()
export class Account extends CommonEntity {
  @ApiProperty('用户名')
  @Column('用户名', 32, { unique: true })
  username: string;

  @Exclude()
  @Column('密码', 128, { transformer: createTransformer({ to: sha512 }) })
  password: string;

  @ApiProperty('手机号')
  @Column('手机号', 11, { nullable: true })
  phone: string;

  @ApiProperty('昵称')
  @Column('昵称', 32)
  nickname: string;

  @ApiProperty('头像')
  @Column('头像', { nullable: true })
  avatar: string;

  @ApiProperty('注册IP')
  @Column('注册IP', 15, { nullable: true })
  reg_ip: string;

  @ApiProperty('登录IP')
  @Column('登录IP', 15, { nullable: true })
  login_ip: string;

  @ApiProperty('登录时间')
  @Column('登录时间', { transformer: dateTransformer, nullable: true })
  login_date: Date;

  @ApiPropertyEnum('帐号类型', accountType)
  @ColumnEnum('帐号类型', accountType)
  type: string;

  @ApiPropertyEnum('状态', accountStatus)
  @ColumnEnum('状态', accountStatus)
  status: number;
}

// -------------------------- 账号基础实体 -------------------------- //

/**
 * 子账号基础实体
 */
export class AccountBase extends CommonEntity {
  @ApiProperty('账号元数据', { type: Account })
  @OneToOne(() => Account, { cascade: true })
  @JoinColumn()
  account: Account;
}
