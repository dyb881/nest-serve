import { Exclude } from 'class-transformer';
import { ApiProperty, Column } from '@app/public-decorator';
import { dateTransformer, sha512Transformer, toIpTransformer } from '@app/public-tool';
import { CommonEntity } from './common';

/**
 * 基础账号实体
 */
export class AccountEntity extends CommonEntity {
  // 一个账号必须存在的属性

  @ApiProperty('用户名')
  @Column('用户名', 32, { unique: true })
  username: string;

  @Exclude()
  @Column('密码', 128, { transformer: sha512Transformer })
  password: string;

  @ApiProperty('注册IP')
  @Column('注册IP', 15, { transformer: toIpTransformer, nullable: true })
  reg_ip: string;

  @ApiProperty('登录IP')
  @Column('登录IP', 15, { transformer: toIpTransformer, nullable: true })
  login_ip: string;

  @ApiProperty('登录时间')
  @Column('登录时间', { transformer: dateTransformer, nullable: true })
  login_date: Date;

  // 一般情况下都会包含的属性

  @ApiProperty('手机号')
  @Column('手机号', 11, { nullable: true })
  phone: string;

  @ApiProperty('昵称')
  @Column('昵称', 32)
  nickname: string;

  @ApiProperty('头像')
  @Column('头像', { nullable: true })
  avatar: string;
}
