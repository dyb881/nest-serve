import { ApiProperty } from '@app/public-decorator';
import { UploadResDto } from '../upload/upload.dto';

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
