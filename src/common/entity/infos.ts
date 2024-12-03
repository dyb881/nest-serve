import { EntityColumn } from '../tools';
import { CommonEntity } from './common';

/**
 * 状态
 */
export const INFOS_STATUS = ['隐藏', '显示'];

/**
 * 基础信息实体
 */
export class InfoBasicEntity extends CommonEntity {
  @EntityColumn('标题')
  title: string;

  @EntityColumn('图标', { nullable: true })
  icon: string;

  @EntityColumn('优先级', { default: 0 })
  priority: number;

  @EntityColumn('状态', { enum: INFOS_STATUS })
  status: number;
}

/**
 * 信息分类实体
 * 树状数据
 */
export class InfoCategoryEntity extends InfoBasicEntity {
  @EntityColumn('上级ID', 36, { nullable: true })
  parentId: string;
}

/**
 * 文章信息实体
 */
export class InfoArticleEntity extends InfoBasicEntity {
  @EntityColumn('图组', { type: 'simple-array', nullable: true })
  pictureGroup: string[];

  @EntityColumn('简介', { nullable: true })
  summary: string;

  @EntityColumn('内容', { type: 'text', nullable: true })
  content: string;

  @EntityColumn('热度', { default: 0 })
  hot: number;
}
