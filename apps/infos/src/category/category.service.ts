import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';
import { CrudService } from '@app/public-class';
import { CategoryCreateDto, CategoryUpdateDto } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService extends CrudService<CategoryCreateDto, CategoryUpdateDto>(Category) {
  constructor(@InjectRepository(Category) readonly categoryRepository: Repository<Category>) {
    super(categoryRepository);
  }

  getMany(conditions?: FindConditions<Category>) {
    return super.getMany(conditions, (queryBuilder) => queryBuilder.addOrderBy('create_date', 'ASC'));
  }
}
