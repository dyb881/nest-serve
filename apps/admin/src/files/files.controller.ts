import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { HttpService } from '@app/http';
import { IdsDto } from '@app/dto-tool';
import { FilesPaginationDto, FilesQueryDto, FilesCreateDto, FilesUpdateDto } from 'apps/files/src/files/files.dto';
import { Files } from 'apps/files/src/files/files.entity';
import { JwtPermissions, Permissions } from '../jwt.guard';

@JwtPermissions()
@ApiTags('文件')
@Controller('files')
export class FilesController {
  api = '/files';

  constructor(private readonly httpService: HttpService) {}

  @Permissions('files.files.query')
  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: FilesPaginationDto })
  findAll(@Query() data: FilesQueryDto) {
    return this.httpService.get(this.api, data);
  }

  @Permissions('files.files.query')
  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: Files })
  findOne(@Param('id') id: string) {
    return this.httpService.get(`${this.api}/${id}`);
  }

  @Permissions('files.files.create')
  @Post()
  @ApiOperation('添加')
  async create(@Body() data: FilesCreateDto) {
    await this.httpService.post(this.api, data);
  }

  @Permissions('files.files.update')
  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: FilesUpdateDto) {
    await this.httpService.put(`${this.api}/${id}`, data);
  }

  @Permissions('files.files.delete')
  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() data: IdsDto) {
    await this.httpService.del(this.api, data);
  }
}
