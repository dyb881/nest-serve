import { Entity } from 'typeorm';
import { InfoCategoryEntity } from '../../common';

/**
 * 分类
 */
@Entity()
export class Category extends InfoCategoryEntity {}
