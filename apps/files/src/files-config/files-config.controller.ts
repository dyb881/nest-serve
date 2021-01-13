import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/decorator';
import { FilesConfigDto, FileConfigDto, FIleValidateDto } from './files-config.dto';
import { FilesConfigService } from './files-config.service';

@ApiTags('文件配置')
@Controller('config')
export class FilesConfigController {
  constructor(private readonly filesConfigService: FilesConfigService) {}

  @Get()
  @ApiOperation('获取配置')
  @ApiResponse({ status: 200, type: FilesConfigDto })
  getConfig() {
    return this.filesConfigService.getConfig();
  }

  @Post()
  @ApiOperation('保存配置(重启服务后生效)')
  async saveConfig(@Body() data: FilesConfigDto) {
    await this.filesConfigService.saveConfig(data);
  }

  @Post('validate')
  @ApiOperation('验证文件信息是否可用')
  @ApiResponse({ status: 200, type: FileConfigDto })
  validate(@Body() data: FIleValidateDto) {
    return this.filesConfigService.validate(data);
  }
}
