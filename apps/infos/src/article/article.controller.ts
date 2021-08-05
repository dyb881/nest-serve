import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationController } from '@app/public-class';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { ArticleCreateDto, ArticleUpdateDto, ArticlePaginationQueryDto, ArticlePaginationDto } from './article.dto';

@ApiTags('文章管理')
@Controller('article')
export class ArticleController extends PaginationController(
  Article,
  ArticleCreateDto,
  ArticleUpdateDto,
  ArticlePaginationQueryDto,
  ArticlePaginationDto
) {
  constructor(readonly articleService: ArticleService) {
    super(articleService);
  }
}
