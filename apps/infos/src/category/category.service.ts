import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryQueryDto, CategoryCreateDto, CategoryUpdateDto } from './category.dto';
import { Category } from './category.entity';
import { CommonService, insNull, insLike } from '@app/service-tool';

@Injectable()
export class CategoryService extends CommonService<Category, any, CategoryCreateDto> {
  constructor(@InjectRepository(Category) readonly categoryRepository: Repository<Category>) {
    super(categoryRepository);
  }

  async findAllCategory(data: CategoryQueryDto) {
    insLike(data, ['title', 'summary', 'content']);
    return super.findAll({ where: data, order: { priority: 'DESC' } });
  }

  async update(id: string, data: CategoryUpdateDto) {
    insNull(data, ['icon', 'picture_group', 'summary', 'content', 'parentId']);
    await super.update(id, data);
  }
}
