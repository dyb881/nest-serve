import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationService } from '@app/public-class';
import { ArticlePaginationQueryDto, ArticleCreateDto, ArticleUpdateDto } from './article.dto';
import { Article } from './article.entity';

@Injectable()
export class ArticleService extends PaginationService<ArticlePaginationQueryDto, ArticleCreateDto, ArticleUpdateDto>(
  Article
) {
  constructor(@InjectRepository(Article) readonly articleRepository: Repository<Article>) {
    super(articleRepository);
  }
}
