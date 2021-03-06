import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { HttpService } from '@app/http';
import { IdsDto } from '@app/dto-tool';
import {
  InformationPaginationDto,
  InformationQueryDto,
  InformationCreateDto,
  InformationUpdateDto,
} from 'apps/infos/src/information/information.dto';
import { Information } from 'apps/infos/src/information/information.entity';
import { JwtPermissions, Permissions } from '../jwt.guard';

@JwtPermissions()
@ApiTags('信息列表')
@Controller('information')
export class InformationController {
  api = '/information';

  constructor(private readonly httpService: HttpService) {}

  @Permissions('infos.information.query')
  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: InformationPaginationDto })
  findAll(@Query() data: InformationQueryDto) {
    return this.httpService.get(this.api, data);
  }

  @Permissions('infos.information.query')
  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: Information })
  findOne(@Param('id') id: string) {
    return this.httpService.get(`${this.api}/${id}`);
  }

  @Permissions('infos.information.create')
  @Post()
  @ApiOperation('添加')
  async create(@Body() data: InformationCreateDto) {
    await this.httpService.post(this.api, data);
  }

  @Permissions('infos.information.update')
  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: InformationUpdateDto) {
    await this.httpService.put(`${this.api}/${id}`, data);
  }

  @Permissions('infos.information.delete')
  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() data: IdsDto) {
    await this.httpService.del(this.api, data);
  }
}
