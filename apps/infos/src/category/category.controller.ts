import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManyController } from '@app/public-class';
import { CategoryService } from './category.service';
import { CategoryCreateDto, CategoryUpdateDto, CategoryQueryDto } from './category.dto';
import { Category } from './category.entity';

@ApiTags('信息分类')
@Controller('category')
export class CategoryController extends ManyController(
  Category,
  CategoryCreateDto,
  CategoryUpdateDto,
  CategoryQueryDto
) {
  constructor(readonly categoryService: CategoryService) {
    super(categoryService);
  }
}
