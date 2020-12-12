import { IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyEnum, fileType, fileStore, PaginationQueryDto, IsIn } from '../../common';

export const type = IsIn(fileType, '请选择正确的文件类型');
export const store = IsIn(fileStore, '请选择正确的储存方式');

export class UploadQueryDto extends PaginationQueryDto {
  @ApiProperty('上传帐号', { required: false })
  username?: string;

  @ApiProperty('文件名', { required: false })
  name?: string;

  @IsOptional()
  @type
  @ApiPropertyEnum('文件类型', fileType, { required: false })
  type?: string;

  @IsOptional()
  @store
  @ApiPropertyEnum('储存方式', fileStore, { required: true })
  store?: string;
}

export class CreateFileCreateDto {
  @ApiProperty('文件名')
  name: string;

  @ApiProperty('文件地址')
  url: string;

  @IsOptional()
  @store
  @ApiPropertyEnum('储存方式', fileStore, { required: true })
  store: string;

  @ApiProperty('文件大小')
  size: string;
}

/**
 * 文件上传
 */
export class UploadDto {
  @ApiProperty('上传文件', { type: 'string', format: 'binary' })
  file: any;
}

/**
 * 上传后返回文件地址
 */
export class UploadResDto {
  @ApiProperty('ID')
  id: string;

  @ApiProperty('文件地址')
  url: string;
}
