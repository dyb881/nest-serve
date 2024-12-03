import { DtoParam } from '../../tools';

/**
 * 文件限制配置
 */
export class FileLimitItem {
  name: string; // 文件类型名称
  maxSizeMB: number; // 最大尺寸 M
  suffixs: string[]; // 后缀名
}

/**
 * 文件限制列表
 */
export class FileLimit {
  [key: string]: FileLimitItem;
}

/**
 * 文件上传数据
 */
export class UploadDto {
  @DtoParam('上传文件', { type: 'string', format: 'binary' })
  file: Express.Multer.File;
}

/**
 * 上传后响应数据
 */
export class UploadResDto {
  @DtoParam('访问地址')
  url: string;
}

/**
 * OSS 临时授权配置
 */
export class OSSSTSOptionsDto {
  @DtoParam('阿里云 accessKeyId')
  accessKeyId: string;

  @DtoParam('阿里云 accessKeySecret')
  accessKeySecret: string;

  @DtoParam('STS 临时授权 token')
  stsToken: string;

  @DtoParam('OSS 区域')
  region: string;

  @DtoParam('OSS 桶')
  bucket: string;
}

/**
 * OSS 验证属性
 */
export class OSSValidateDto {
  @DtoParam('文件名')
  name: string;

  @DtoParam('文件大小')
  size: number;
}

/**
 * OSS 上传对象属性
 */
export class OSSPutObjectDto extends UploadResDto {
  @DtoParam('OSS对象名称')
  name: string;
}
