import { Controller, Post, Get, Body, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@app/decorator';
import { HttpService } from '@app/http';
import { UploadDto, UploadResDto } from '../files/files.dto';
import { UploadService } from './upload.service';
import { FIleValidateDto } from '../files-config/files-config.dto';

@ApiTags('上传文件')
@Controller('upload')
export class UploadController {
  constructor(private readonly httpService: HttpService, private readonly uploadService: UploadService) {}

  @Post('server/:type')
  @ApiOperation('上传到服务器')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadDto })
  @ApiResponse({ status: 200, type: UploadResDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadServer(@UploadedFile() file, @Body() body: UploadDto) {
    const data = await this.uploadService.getUploadData(file, body);

    // 保存文件信息
    await this.httpService.post('/files', data);

    return data.url;
  }

  @Post('oss/:type')
  @ApiOperation('上传到OSS')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadDto })
  @ApiResponse({ status: 200, type: UploadResDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadOSS(@UploadedFile() file, @Body() body: UploadDto) {
    const data = await this.uploadService.getUploadData(file, body);

    // 尝试推送到OSS
    await this.uploadService.putOSS(data);

    // 保存文件信息
    await this.httpService.post('/files', data);

    return data.url;
  }

  @Get('sts')
  @ApiOperation('获取临时授权(15分钟有效期，尽量在14分钟内获取新的授权)')
  getSTS() {
    return this.uploadService.getSTS();
  }

  @Get('path')
  @ApiOperation('获取上传的文件对象路径')
  async getPath(@Query() data: FIleValidateDto) {
    const { name, size } = data;

    // 验证文件信息
    const { type } = await this.httpService.post('/config/validate', data);

    const { url, path } = this.uploadService.getPath(name);

    // 保存文件信息
    await this.httpService.post('/files', { name, url, type, store: 'oss', size });

    return { url, path };
  }
}
