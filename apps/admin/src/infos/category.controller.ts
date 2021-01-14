import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { HttpService } from '@app/http';
import { IdsDto } from '@app/dto-tool';
import { CategoryQueryDto, CategoryCreateDto, CategoryUpdateDto } from 'apps/infos/src/category/category.dto';
import { Category } from 'apps/infos/src/category/category.entity';
import { JwtPermissions, Permissions } from '../jwt.guard';

@JwtPermissions()
@ApiTags('分类')
@Controller('category')
export class CategoryController {
  api = '/category';

  constructor(private readonly httpService: HttpService) {}

  @Permissions('infos.category.query')
  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: [Category] })
  findAll(@Query() data: CategoryQueryDto) {
    return this.httpService.get(this.api, data);
  }

  @Permissions('infos.category.query')
  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: Category })
  findOne(@Param('id') id: string) {
    return this.httpService.get(`${this.api}/${id}`);
  }

  @Permissions('infos.category.create')
  @Post()
  @ApiOperation('添加')
  async create(@Body() data: CategoryCreateDto) {
    await this.httpService.post(this.api, data);
  }

  @Permissions('infos.category.update')
  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: CategoryUpdateDto) {
    await this.httpService.put(`${this.api}/${id}`, data);
  }

  @Permissions('infos.category.delete')
  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() data: IdsDto) {
    await this.httpService.del(this.api, data);
  }
}
