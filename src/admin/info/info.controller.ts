import { Controller, Get, Post, Put, Delete, Query, Param, Body, Req } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { InfoService } from './info.service';
import { InfoQueryDto, InfoCreateDto, InfoUpdateDto } from './info.dto';
import { Info } from './info.entity';
import { DeleteDto, ApiOperation, PaginationDto, JwtAdmin } from '../../common';

@JwtAdmin()
@ApiTags('信息列表')
@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  @ApiOperation('查询列表')
  @ApiResponse({ status: 200, type: PaginationDto(Info) })
  findAll(@Query() data: InfoQueryDto) {
    return this.infoService.pagination(data);
  }

  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: Info })
  findOne(@Param('id') id: string) {
    return this.infoService.findOne(id);
  }

  @Post()
  @ApiOperation('添加')
  async create(@Body() data: InfoCreateDto, @Req() req) {
    await this.infoService.create({ ...data, create_username: req.user.username });
  }

  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: InfoUpdateDto, @Req() req) {
    await this.infoService.update(id, { ...data, update_username: req.user.username });
  }

  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() { ids }: DeleteDto) {
    await this.infoService.delete(ids);
  }
}
