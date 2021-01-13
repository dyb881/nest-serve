import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { IdsDto } from '@app/dto-tool';
import { CategoryService } from './category.service';
import { CategoryQueryDto, CategoryCreateDto, CategoryUpdateDto } from './category.dto';
import { Category } from './category.entity';

@ApiTags('分类')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation('查询所有')
  @ApiResponse({ status: 200, type: [Category] })
  findAll(@Query() data: CategoryQueryDto) {
    return this.categoryService.findAllCategory(data);
  }

  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: Category })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Post()
  @ApiOperation('添加')
  async create(@Body() data: CategoryCreateDto) {
    await this.categoryService.create(data);
  }

  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: CategoryUpdateDto) {
    await this.categoryService.update(id, data);
  }

  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() { ids }: IdsDto) {
    await this.categoryService.delete(ids);
  }
}
