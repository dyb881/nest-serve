import { Inject, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { JwtPermissions } from '@app/public-module';
import { PaginationClientController } from '@app/public-class';
import { Article } from 'apps/infos/src/article/article.entity';
import {
  ArticleCreateDto,
  ArticleUpdateDto,
  ArticlePaginationQueryDto,
  ArticlePaginationDto,
} from 'apps/infos/src/article/article.dto';

const PERMISSIONS = 'infos.article';

@JwtPermissions()
@ApiTags('文章管理')
@Controller('infos/article')
export class ArticleController extends PaginationClientController(
  PERMISSIONS,
  Article,
  ArticleCreateDto,
  ArticleUpdateDto,
  ArticlePaginationQueryDto,
  ArticlePaginationDto
) {
  constructor(@Inject('INFOS_SERVICE') readonly client: ClientProxy) {
    super(client);
  }
}
