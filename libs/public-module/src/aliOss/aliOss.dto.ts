import { ApiProperty } from '@app/public-decorator';
import { UploadResDto } from '../upload/upload.dto';

export class FileLimitItemDto {
  name: string; // 文件类型名称
  maxSizeMB: number; // 最大尺寸 M
  suffixs: string[]; // 后缀名
}

export class FileLimitDto {
  [key: string]: FileLimitItemDto;
}

/**
 * OSS 验证属性
 */
export class OSSValidateDto {
  @ApiProperty('文件名')
  name: string;

  @ApiProperty('文件大小')
  size: number;
}

/**
 * OSS 上传对象属性
 */
export class OSSPutObjectDto extends UploadResDto {
  @ApiProperty('OSS对象名称')
  name: string;
}
