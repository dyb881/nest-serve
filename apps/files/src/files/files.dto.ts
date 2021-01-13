import { PaginationDto, PaginationQueryDto } from '@app/dto-tool';
import { ApiProperty, ApiPropertyEnum, IsOptional, IsIn, ToUndefined } from '@app/decorator';
import { Files, fileType, fileStore } from './files.entity';

export const type = IsIn(fileType, '文件类型');
export const store = IsIn(fileStore, '储存');

export class FilesPaginationDto extends PaginationDto(Files) {}

export class FilesQueryDto extends PaginationQueryDto {
  @ApiProperty('文件名', { required: false })
  name?: string;

  @IsOptional()
  @type
  @ApiPropertyEnum('文件类型', fileType, { required: false })
  type?: string;

  @IsOptional()
  @store
  @ApiPropertyEnum('储存', fileStore, { required: false })
  store?: number;
}

export class FilesCreateDto {
  @ApiProperty('文件名')
  name: string;

  @ApiProperty('文件地址')
  url: string;

  @type
  @ApiPropertyEnum('文件类型', fileType)
  type: string;

  @store
  @ApiPropertyEnum('储存', fileStore)
  store: string;

  @ApiProperty('文件大小')
  size: number;
}

export class FilesUpdateDto extends FilesCreateDto {}

export class UploadDto {
  @ApiProperty('上传文件', { type: 'string', format: 'binary' })
  file: any;

  @ToUndefined()
  @IsOptional()
  @type
  @ApiPropertyEnum('文件类型', fileType, { required: false })
  type?: string;
}

export class UploadResDto {
  @ApiProperty('ID')
  id: string;

  @ApiProperty('文件地址')
  url: string;
}
