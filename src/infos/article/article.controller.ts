import { ApiPathAuth, CommonController } from '../../common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import {
  ArticleCreateDto,
  ArticleUpdateDto,
  ArticleQueryDto,
  ArticlePaginationQueryDto,
  ArticlePaginationDto,
} from './article.dto';

@ApiPathAuth('article', '文章管理')
export class ArticleController extends CommonController(
  Article,
  ArticleCreateDto,
  ArticleUpdateDto,
  ArticleQueryDto,
  ArticlePaginationQueryDto,
  ArticlePaginationDto,
  ArticleService,
) {}
