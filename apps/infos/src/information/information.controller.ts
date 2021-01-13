import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { IdsDto } from '@app/dto-tool';
import { InformationService } from './information.service';
import {
  InformationPaginationDto,
  InformationQueryDto,
  InformationCreateDto,
  InformationUpdateDto,
} from './information.dto';
import { Information } from './information.entity';

@ApiTags('信息列表')
@Controller('information')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: InformationPaginationDto })
  findAll(@Query() data: InformationQueryDto) {
    return this.informationService.pagination(data);
  }

  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: Information })
  findOne(@Param('id') id: string) {
    return this.informationService.findOne(id);
  }

  @Post()
  @ApiOperation('添加')
  async create(@Body() data: InformationCreateDto) {
    await this.informationService.create(data);
  }

  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: InformationUpdateDto) {
    await this.informationService.update(id, data);
  }

  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() { ids }: IdsDto) {
    await this.informationService.delete(ids);
  }
}
