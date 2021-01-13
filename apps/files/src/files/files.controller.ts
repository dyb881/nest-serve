import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { IdsDto } from '@app/dto-tool';
import { ApiOperation } from '@app/decorator';
import { FilesPaginationDto, FilesQueryDto, FilesCreateDto, FilesUpdateDto } from './files.dto';
import { Files } from './files.entity';
import { FilesService } from './files.service';

@ApiTags('文件')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Put('oss')
  @ApiOperation('推送服务器文件到OSS')
  async toOSS(@Body() { ids }: IdsDto) {
    await this.filesService.toOSS(ids);
  }

  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: FilesPaginationDto })
  findAll(@Query() data: FilesQueryDto) {
    return this.filesService.pagination(data);
  }

  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: Files })
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  @Post()
  @ApiOperation('添加')
  async create(@Body() data: FilesCreateDto) {
    await this.filesService.create(data);
  }

  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: FilesUpdateDto) {
    await this.filesService.update(id, data);
  }

  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() { ids }: IdsDto) {
    await this.filesService.delete(ids);
  }
}
