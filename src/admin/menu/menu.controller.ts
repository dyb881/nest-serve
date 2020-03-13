import { Controller, Get, Post, Put, Delete, Query, Param, Body, Req } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { MenuQueryDto, MenuCreateDto, MenuUpdateDto } from './menu.dto';
import { Menu } from './menu.entity';
import { DeleteDto, ApiOperation, JwtAdmin } from '../../common';

@JwtAdmin()
@ApiTags('菜单分类')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOperation('查询所有')
  @ApiResponse({ status: 200, type: [Menu] })
  findAll(@Query() data: MenuQueryDto) {
    return this.menuService.findAllMenu(data);
  }

  @Get(':id')
  @ApiOperation('查询详情')
  @ApiResponse({ status: 200, type: Menu })
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Post()
  @ApiOperation('添加')
  async create(@Body() data: MenuCreateDto, @Req() req) {
    await this.menuService.create({ ...data, create_username: req.user.username });
  }

  @Put(':id')
  @ApiOperation('编辑')
  async update(@Param('id') id: string, @Body() data: MenuUpdateDto, @Req() req) {
    await this.menuService.update(id, { ...data, update_username: req.user.username });
  }

  @Delete()
  @ApiOperation('删除')
  async deletes(@Body() { ids }: DeleteDto) {
    await this.menuService.delete(ids);
  }
}
