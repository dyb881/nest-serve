import {
  PaginationDto,
  PaginationQueryDtoExtends,
  InfoArticleQueryDto,
  InfoArticleCreateDto,
  InfoArticleUpdateDto,
} from '@app/public-class';
import { ApiProperty } from '@app/public-decorator';
import { Article } from './article.entity';

/**
 * 分页数据
 */
export class ArticlePaginationDto extends PaginationDto(Article) {}

/**
 * 查询分页对象
 */
export class ArticlePaginationQueryDto extends PaginationQueryDtoExtends(InfoArticleQueryDto) {
  @ApiProperty('分类ID', { required: false })
  categoryId?: string;
}

/**
 * 创建数据对象
 */
export class ArticleCreateDto extends InfoArticleCreateDto {
  @ApiProperty('分类ID', { required: false })
  categoryId?: string;
}

/**
 * 编辑数据对象
 */
export class ArticleUpdateDto extends InfoArticleUpdateDto {}
