import { Entity } from 'typeorm';
import { CommonEntity, Column, ApiProperty } from '../../common';

/**
 * 帐号
 */
@Entity()
export class Menu extends CommonEntity {
  @ApiProperty('上级 ID')
  @Column('上级 ID', 36, { nullable: true })
  pid: string;

  @ApiProperty('标题')
  @Column('标题')
  title: string;

  @ApiProperty('图标')
  @Column('图标', { nullable: true })
  icon: string;

  @ApiProperty('内容')
  @Column('内容', { type: 'text', nullable: true })
  content: string;

  @ApiProperty('排序号')
  @Column('排序号')
  sort: number;

  @ApiProperty('是否显示')
  @Column('是否显示')
  show: boolean;

  @ApiProperty('创建帐号')
  @Column('创建帐号', 32)
  create_username: string;

  @ApiProperty('更新帐号')
  @Column('更新帐号', 32, { nullable: true })
  update_username: string;
}
