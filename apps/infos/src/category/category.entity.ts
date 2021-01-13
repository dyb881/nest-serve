import { Entity } from 'typeorm';
import { Column, ColumnEnum, ColumnArray, ApiProperty, ApiPropertyEnum } from '@app/decorator';
import { CommonEntity } from '@app/entity-tool';

/**
 * 信息状态
 */
export const infoStatus = ['隐藏', '显示'];

/**
 * 信息基础实体
 */
export class InfosBase extends CommonEntity {
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

  @ApiProperty('热度')
  @Column('热度')
  hot: number;

  @ApiProperty('优先级')
  @Column('优先级')
  priority: number;

  @ApiPropertyEnum('状态', infoStatus)
  @ColumnEnum('状态', infoStatus)
  status: number;
}

@Entity()
export class Category extends InfosBase {
  @ApiProperty('上级ID')
  @Column('上级ID', { nullable: true })
  parentId: string;
}
