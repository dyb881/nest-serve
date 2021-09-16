import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { OSSValidateDto, OSSPutObjectDto } from './aliOss.dto';
import { AliOssService } from './aliOss.service';
import { JwtPermissions } from '../jwtAuth';

@JwtPermissions()
@ApiTags('OSS上传文件')
@Controller('oss')
export class AliOssController {
  constructor(private readonly aliOssService: AliOssService) {}

  @Get('sts')
  @ApiOperation('获取临时授权(15分钟有效期，尽量在14分钟内获取新的授权)')
  getSTS() {
    return this.aliOssService.getSTS();
  }

  @Get('put/object')
  @ApiOperation('获取OSS上传对象')
  @ApiResponse({ status: 200, type: OSSPutObjectDto })
  async getPutObject(@Query() { name, size }: OSSValidateDto) {
    await this.aliOssService.verify({ name, size });
    return this.aliOssService.getPutObject(name);
  }
}
