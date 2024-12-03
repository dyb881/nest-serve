import { UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ApiConsumes } from '@nestjs/swagger';
import { Method, ApiPathAuth } from '../../tools';

import { UploadDto, UploadResDto, OSSSTSOptionsDto, OSSValidateDto, OSSPutObjectDto } from './upload.dto';
import { UploadService } from './upload.service';

@ApiPathAuth('', '上传文件')
export class UploadController {
  uploadHost: string;
  uploadPath: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly uploadService: UploadService,
  ) {
    this.uploadHost = this.configService.get('uploadHost');
    this.uploadPath = this.configService.get('uploadPath');
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Method('上传到服务器', ['Post', 'upload'], { res: UploadResDto, body: UploadDto })
  async uploadServer(@UploadedFile() file) {
    this.uploadService.verify(file);
    const [_, path] = file.path.split('uploads');
    const url = `${this.uploadHost}/${this.uploadPath}/${path}`;
    return { url };
  }

  @Method('获取临时授权(15分钟有效期，尽量在14分钟内获取新的授权)', ['Get', 'oss/sts'], { res: OSSSTSOptionsDto })
  getSTS() {
    return this.uploadService.getSTS();
  }

  @Method('获取OSS上传对象', ['Get', 'oss/put/object'], { res: OSSPutObjectDto })
  async getPutObject(@Query() { name, size }: OSSValidateDto) {
    this.uploadService.verify({ name, size });
    return this.uploadService.getPutObject(name);
  }
}
