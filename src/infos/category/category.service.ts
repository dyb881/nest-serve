import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common';
import { Category } from './category.entity';
import { CategoryCreateDto, CategoryUpdateDto, CategoryQueryDto, CategoryPaginationQueryDto } from './category.dto';

@Injectable()
export class CategoryService extends CommonService(
  Category,
  CategoryCreateDto,
  CategoryUpdateDto,
  CategoryQueryDto,
  CategoryPaginationQueryDto,
) {}
