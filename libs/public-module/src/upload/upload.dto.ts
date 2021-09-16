import { ApiProperty } from '@app/public-decorator';

export class FileLimitItem {
  name: string; // 文件类型名称
  maxSizeMB: number; // 最大尺寸 M
  suffixs: string[]; // 后缀名
}

export class FileLimit {
  [key: string]: FileLimitItem;
}

/**
 * 文件上传数据
 */
export class UploadDto {
  @ApiProperty('上传文件', { type: 'string', format: 'binary' })
  file: any;
}

/**
 * 上传后响应数据
 */
export class UploadResDto {
  @ApiProperty('访问地址')
  url: string;
}
