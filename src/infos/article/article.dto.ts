import {
  PaginationQueryDto,
  PaginationDto,
  InfoArticleQueryDto,
  InfoArticleCreateDto,
  InfoArticleUpdateDto,
} from '../../common';
import { Article } from './article.entity';

/**
 * 查询条件
 */
export class ArticleQueryDto extends InfoArticleQueryDto {}

/**
 * 查询分页数据条件
 */
export class ArticlePaginationQueryDto extends PaginationQueryDto(ArticleQueryDto) {}

/**
 * 分页数据
 */
export class ArticlePaginationDto extends PaginationDto(Article) {}

/**
 * 创建数据对象
 */
export class ArticleCreateDto extends InfoArticleCreateDto {}

/**
 * 编辑数据对象
 */
export class ArticleUpdateDto extends InfoArticleUpdateDto {}
