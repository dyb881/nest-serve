import { dateTransformer, sha512Transformer, toIpTransformer, EntityColumn } from '../tools';
import { CommonEntity } from './common';

/**
 * 基础账号实体
 */
export class AccountEntity extends CommonEntity {
  @EntityColumn('用户名', 32, { unique: true })
  username: string;

  @EntityColumn('密码', 128, { transformer: sha512Transformer, exclude: true })
  password: string;

  @EntityColumn('注册IP', 15, { transformer: toIpTransformer, nullable: true })
  reg_ip: string;

  @EntityColumn('登录IP', 15, { transformer: toIpTransformer, nullable: true })
  login_ip: string;

  @EntityColumn('登录时间', { transformer: dateTransformer, nullable: true })
  login_date: Date;

  @EntityColumn('手机号', 11, { nullable: true })
  phone: string;

  @EntityColumn('昵称', 32)
  nickname: string;

  @EntityColumn('头像', { nullable: true })
  avatar: string;
}
