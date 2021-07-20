import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty, Column } from '@app/public-decorator';
import { dateTransformer, sha512Transformer } from '@app/public-tool';

/**
 * 公用实体
 */
export class CommonEntity {
  @ApiProperty('ID')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty('创建时间')
  @CreateDateColumn({ comment: '创建时间', transformer: dateTransformer })
  create_date: Date;

  @ApiProperty('更新时间')
  @UpdateDateColumn({ comment: '更新时间', transformer: dateTransformer })
  update_date: Date;
}

/**
 * 基础账号实体
 */
export class AccountEntity extends CommonEntity {
  @ApiProperty('用户名')
  @Column('用户名', 32, { unique: true })
  username: string;

  @Exclude()
  @Column('密码', 128, { transformer: sha512Transformer })
  password: string;

  @ApiProperty('注册IP')
  @Column('注册IP', 15, { nullable: true })
  reg_ip: string;

  @ApiProperty('登录IP')
  @Column('登录IP', 15, { nullable: true })
  login_ip: string;

  @ApiProperty('登录时间')
  @Column('登录时间', { transformer: dateTransformer, nullable: true })
  login_date: Date;

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