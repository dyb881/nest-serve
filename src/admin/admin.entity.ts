import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: '用户名', length: 32, unique: true })
  username: string;

  @Column({ comment: '密码', length: 32 })
  password: string;

  @Column({ comment: '昵称', length: 32 })
  nickname: string;

  @Column({ comment: '注册IP', length: 15 })
  regIp: string;

  @Column({ comment: '登录IP', length: 15 })
  loginIp: string;

  @Column({ comment: '注册时间' })
  regTime: number;

  @Column({ comment: '登录时间' })
  loginTime: number;

  @Column({ comment: '更新时间' })
  updateTime: number;

  @Column({
    comment: '状态，0未审核，1已审核，2冻结',
    type: 'enum',
    enum: [0, 1, 2],
    default: 0,
  })
  status: number;
}
