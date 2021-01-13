import { ApiProperty, ApiPropertyEnum, IsOptional, ToUndefined } from '@app/decorator';
import { fileType } from '../files/files.entity';
import { type } from '../files/files.dto';

export class FileConfigDto {
  @ApiProperty('类型下标')
  type: string;

  @ApiProperty('名称')
  name: string;

  @ApiProperty('后缀名')
  suffixs: string[];

  @ApiProperty('最大体积/MB')
  maxSizeMB: number;

  maxSize?: number;
}

export class FilesConfigDto {
  @ApiProperty('文件配置', { type: [FileConfigDto] })
  filesConfig: FileConfigDto[];
}

export class FIleValidateDto {
  @ApiProperty('文件名')
  name: string;

  @ApiProperty('文件大小')
  size: number;

  @ToUndefined()
  @IsOptional()
  @type
  @ApiPropertyEnum('文件类型', fileType, { required: false })
  type?: string;
}

export class FileInfoDto extends FIleValidateDto {
  @ApiProperty('文件路径', { required: false })
  path?: string;
}
