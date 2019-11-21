import {
  Controller,
  Req,
  Query,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto, UpdateAdminDto, QueryAdminDto } from './common';
import requestIp from 'request-ip';

@Controller('admin')
@ApiUseTags('管理员账号')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ title: '查询列表' })
  findAll(@Query() queryData: QueryAdminDto) {
    return this.adminService.findAll(queryData);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ title: '查询详情' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Post()
  @ApiOperation({ title: '添加' })
  async create(@Req() req, @Body() createData: CreateAdminDto) {
    await this.adminService.create({
      ...createData,
      reg_ip: requestIp.getClientIp(req),
    });
  }

  @Put(':id')
  @ApiOperation({ title: '编辑' })
  async update(@Param('id') id: string, @Body() updateData: UpdateAdminDto) {
    await this.adminService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ title: '删除' })
  async remove(@Param('id') id: string) {
    await this.adminService.remove(id);
  }
}
