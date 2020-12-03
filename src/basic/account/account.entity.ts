import { Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { sha512 } from 'js-sha512';
import {
  CommonEntity,
  Column,
  ColumnEnum,
  createTransformer,
  dateTransformer,
  ApiProperty,
  ApiPropertyEnum,
  accountType,
  dataStatus,
} from '../../common';

@Entity()
export class Account extends CommonEntity {
  @ApiProperty('用户名')
  @Column('用户名', 32, { unique: true })
  username: string;

  @Exclude()
  @Column('密码', 128, { transformer: createTransformer({ to: sha512 }) })
  password: string;

  @ApiProperty('昵称')
  @Column('昵称', 32)
  nickname: string;

  @ApiProperty('头像')
  @Column('头像', { nullable: true })
  avatar: string;

  @ApiProperty('注册IP')
  @Column('注册IP', 15)
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

  @ApiPropertyEnum('状态', dataStatus.account)
  @ColumnEnum('状态', dataStatus.account)
  status: number;
}
