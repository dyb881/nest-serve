import { Controller, Get, Query, UnsupportedMediaTypeException } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@app/public-decorator';
import { FileLimitDto, OSSValidateDto, OSSPutObjectDto } from './aliOss.dto';
import { AliOssService } from './aliOss.service';
import { JwtPermissions } from '../jwtAuth';
import { findKey } from 'lodash';
import { extname } from 'path';

@JwtPermissions()
@ApiTags('OSS上传文件')
@Controller('oss')
export class AliOssController {
  fileLimit: FileLimitDto;

  constructor(private readonly aliOssService: AliOssService, readonly configService: ConfigService) {
    this.fileLimit = this.configService.get<FileLimitDto>('fileLimit');
  }

  @Get('sts')
  @ApiOperation('获取临时授权(15分钟有效期，尽量在14分钟内获取新的授权)')
  getSTS() {
    return this.aliOssService.getSTS();
  }

  @Get('put/object')
  @ApiOperation('获取OSS上传对象')
  @ApiResponse({ status: 200, type: OSSPutObjectDto })
  async getPutObject(@Query() { name, size }: OSSValidateDto) {
    const suffix = extname(name).slice(1);
    const fileLimitKey = findKey(this.fileLimit, { suffixs: [suffix] });
    if (!fileLimitKey) throw new UnsupportedMediaTypeException('禁止上传该类型文件');
    const fileLimit = this.fileLimit[fileLimitKey];
    if (size > fileLimit.maxSizeMB * 1024 * 1024)
      throw new UnsupportedMediaTypeException(`${fileLimit.name}文件大小不能大于 ${fileLimit.maxSizeMB} MB`);

    return this.aliOssService.getPutObject(name);
  }
}
