import {
  Controller,
  Query,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateDto, UpdateDto, QueryDto } from './dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  findAll(@Query() query: QueryDto) {
    console.log(query);
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return `This action returns a #${id} cat`;
  }

  @Post()
  create(@Body() create: CreateDto) {
    return this.adminService.create(create);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() update: UpdateDto) {
    console.log(id, update);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
