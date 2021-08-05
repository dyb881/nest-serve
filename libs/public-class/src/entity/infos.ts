import { ApiProperty, ApiPropertyEnum, Column, ColumnArray, ColumnEnum } from '@app/public-decorator';
import { CommonEntity } from './common';

/**
 * 状态
 */
export const INFOS_STATUS = ['隐藏', '显示'];

/**
 * 基础信息实体
 */
export class InfoBasicEntity extends CommonEntity {
  @ApiProperty('标题')
  @Column('标题')
  title: string;

  @ApiProperty('图标')
  @Column('图标', { nullable: true })
  icon: string;

  @ApiProperty('优先级')
  @Column('优先级', { default: 0 })
  priority: number;

  @ApiPropertyEnum('状态', INFOS_STATUS)
  @ColumnEnum('状态', INFOS_STATUS)
  status: number;
}

/**
 * 信息分类实体
 * 树状数据
 */
export class InfoCategoryEntity extends InfoBasicEntity {
  @ApiProperty('上级ID')
  @Column('上级ID', 36, { nullable: true })
  parentId: string;
}

/**
 * 文章信息实体
 */
export class InfoArticleEntity extends InfoBasicEntity {
  @ApiProperty('图组')
  @ColumnArray('图组', { nullable: true })
  pictureGroup: string[];

  @ApiProperty('简介')
  @Column('简介', { nullable: true })
  summary: string;

  @ApiProperty('内容')
  @Column('内容', { type: 'text', nullable: true })
  content: string;

  @ApiProperty('热度')
  @Column('热度', { default: 0 })
  hot: number;
}
