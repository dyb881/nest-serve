import { Entity } from 'typeorm';
import { InfoArticleEntity } from '../../common';

/**
 * 文章
 */
@Entity()
export class Article extends InfoArticleEntity {}
