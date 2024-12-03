import {
  PaginationQueryDto,
  PaginationDto,
  InfoCategoryQueryDto,
  InfoCategoryCreateDto,
  InfoCategoryUpdateDto,
} from '../../common';
import { Category } from './category.entity';

/**
 * 查询条件
 */
export class CategoryQueryDto extends InfoCategoryQueryDto {}

/**
 * 查询分页数据条件
 */
export class CategoryPaginationQueryDto extends PaginationQueryDto(CategoryQueryDto) {}

/**
 * 分页数据
 */
export class CategoryPaginationDto extends PaginationDto(Category) {}

/**
 * 创建数据对象
 */
export class CategoryCreateDto extends InfoCategoryCreateDto {}

/**
 * 编辑数据对象
 */
export class CategoryUpdateDto extends InfoCategoryUpdateDto {}
