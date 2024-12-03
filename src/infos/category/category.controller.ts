import { ApiPathAuth, CommonController } from '../../common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import {
  CategoryCreateDto,
  CategoryUpdateDto,
  CategoryQueryDto,
  CategoryPaginationQueryDto,
  CategoryPaginationDto,
} from './category.dto';

@ApiPathAuth('category', '分类管理')
export class CategoryController extends CommonController(
  Category,
  CategoryCreateDto,
  CategoryUpdateDto,
  CategoryQueryDto,
  CategoryPaginationQueryDto,
  CategoryPaginationDto,
  CategoryService,
) {}
