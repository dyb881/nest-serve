import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { HttpService } from '@app/http';
import { FilesConfigDto } from 'apps/files/src/files-config/files-config.dto';
import { JwtPermissions, Permissions } from '../jwt.guard';

@JwtPermissions()
@ApiTags('文件配置')
@Controller('files-config')
export class FilesConfigController {
  api = '/config';

  constructor(private readonly httpService: HttpService) {}

  @Permissions('files.config.query')
  @Get()
  @ApiOperation('获取配置')
  @ApiResponse({ status: 200, type: FilesConfigDto })
  findAll() {
    return this.httpService.get(this.api);
  }

  @Permissions('files.config.update')
  @Post()
  @ApiOperation('保存配置(重启服务后生效)')
  async saveConfig(@Body() data: FilesConfigDto) {
    await this.httpService.post(this.api, data);
  }
}
