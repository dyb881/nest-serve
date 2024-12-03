import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common';
import { Article } from './article.entity';
import { ArticleCreateDto, ArticleUpdateDto, ArticleQueryDto, ArticlePaginationQueryDto } from './article.dto';

@Injectable()
export class ArticleService extends CommonService(
  Article,
  ArticleCreateDto,
  ArticleUpdateDto,
  ArticleQueryDto,
  ArticlePaginationQueryDto,
) {}
