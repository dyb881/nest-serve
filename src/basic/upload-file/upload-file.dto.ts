import { Entity } from 'typeorm';
import { IsOptional } from 'class-validator';
import { CommonDto, ApiProperty, ApiPropertyEnum, fileType, PaginationDto, PaginationQueryDto, IsIn } from '../../common';

export const type = IsIn(fileType, '请选择正确的文件类型');

/**
 * 文件
 */
@Entity()
export class UploadFile extends CommonDto {
  @ApiProperty('文件名')
  name: string;

  @ApiProperty('文件地址')
  url: string;

  @ApiPropertyEnum('文件类型', fileType)
  type: string;

  @ApiProperty('文件大小')
  size: string;

  @ApiProperty('上传帐号')
  username: string;
}

export class UploadPaginationDto extends PaginationDto(UploadFile) {}

export class UploadQueryDto extends PaginationQueryDto {
  @ApiProperty('文件名', { required: false })
  name?: string;

  @IsOptional()
  @type
  @ApiPropertyEnum('文件类型', fileType, { required: false })
  type?: string;

  @ApiProperty('上传帐号', { required: false })
  username?: string;
}

export class CreateFileCreateDto {
  @ApiProperty('文件名')
  name: string;

  @ApiProperty('文件地址')
  url: string;

  @type
  @ApiPropertyEnum('文件类型', fileType)
  type: string;

  @ApiProperty('文件大小')
  size: number;
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
  @ApiProperty('文件地址')
  url: string;
}
