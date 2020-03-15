import { Entity } from 'typeorm';
import { CommonEntity, Column, ColumnEnum, ColumnArray, ApiProperty, ApiPropertyEnum, infoStatus } from '../../common';

@Entity()
export class Info extends CommonEntity {
  @ApiProperty('所属菜单 ID')
  @Column('所属菜单 ID', 36)
  menu_id: string;

  @ApiProperty('标题')
  @Column('标题')
  title: string;

  @ApiProperty('图标')
  @Column('图标', { nullable: true })
  icon: string;

  @ApiProperty('图组')
  @ColumnArray('图组', { nullable: true })
  picture_group: string[];

  @ApiProperty('简介')
  @Column('简介', { nullable: true })
  summary: string;

  @ApiProperty('内容')
  @Column('内容', { type: 'text', nullable: true })
  content: string;

  @ApiProperty('优先级')
  @Column('优先级', { default: 0 })
  priority: number;

  @ApiProperty('热度')
  @Column('热度', { default: 0 })
  hot: number;

  @ApiPropertyEnum('状态', infoStatus)
  @ColumnEnum('状态', infoStatus)
  status: number;

  @ApiProperty('创建帐号')
  @Column('创建帐号', 32)
  create_username: string;

  @ApiProperty('更新帐号')
  @Column('更新帐号', 32, { nullable: true })
  update_username: string;
}
