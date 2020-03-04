import {
  Controller,
  UseGuards,
  Post,
  Get,
  Delete,
  Query,
  Param,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { QueryFilesDto, FilesPaginationDto, FilesUploadDto, FilesUrlDto } from './files.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('文件')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  @ApiOperation({ summary: '查询列表' })
  @ApiResponse({ status: 200, type: FilesPaginationDto })
  findAll(@Query() data: QueryFilesDto) {
    return this.filesService.findAndCount(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  async remove(@Param('id') id: string) {
    await this.filesService.remove(id);
  }

  @Post('/upload')
  @ApiOperation({ summary: '上传文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto })
  @ApiResponse({ status: 200, type: FilesUrlDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Req() req) {
    return this.filesService.create({
      name: file.originalname,
      url: file.path.split('/public')[1],
      size: file.size,
      username: req.user.username,
    });
  }
}
