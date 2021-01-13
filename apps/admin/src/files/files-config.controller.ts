import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { HttpService } from '@app/http';
import { FilesConfigDto, FileConfigDto, FileInfoDto } from 'apps/files/src/files-config/files-config.dto';

@ApiTags('文件配置')
@Controller('files-config')
export class FilesConfigController {
  api = '/config';

  constructor(private readonly httpService: HttpService) {}

  @Get()
  @ApiOperation('获取配置')
  @ApiResponse({ status: 200, type: FilesConfigDto })
  findAll() {
    return this.httpService.get(this.api);
  }

  @Post()
  @ApiOperation('保存配置(重启服务后生效)')
  async saveConfig(@Body() data: FilesConfigDto) {
    await this.httpService.post(this.api, data);
  }

  @Post('validate')
  @ApiOperation('验证文件信息是否可用')
  @ApiResponse({ status: 200, type: FileConfigDto })
  validate(@Body() data: FileInfoDto) {
    return this.httpService.post(`${this.api}/validate`, data);
  }
}
