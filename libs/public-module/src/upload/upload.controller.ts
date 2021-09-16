import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@app/public-decorator';
import { UploadService } from './upload.service';
import { UploadDto, UploadResDto } from './upload.dto';
import { JwtPermissions } from '../jwtAuth';

@JwtPermissions()
@ApiTags('上传文件')
@Controller('upload')
export class UploadController {
  uploadHost: string;

  constructor(private readonly uploadService: UploadService, private readonly configService: ConfigService) {
    this.uploadHost = this.configService.get('uploadHost');
  }

  @Post()
  @ApiOperation('上传到服务器')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadDto })
  @ApiResponse({ status: 200, type: UploadResDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadServer(@UploadedFile() file) {
    await this.uploadService.verify(file);
    const url = this.uploadHost + file.path.split('uploads')[1];
    return { url };
  }
}
