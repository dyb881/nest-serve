import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { typeEnum, typeComment } from './files.entity';
import { CommonDto, QueryPaginationDto, createValidator } from '../../common';

/**
 * 自定义验证器
 */
export const Validator = createValidator({
  username: {
    matches: /^[\d\w-_]{4,32}$/,
    message: '请输入正确的用户名，4-32位、字母、数字、下划线、减号',
  },
  password: {
    matches: /^[\d\w-_]{4,32}$/,
    message: '请输入正确的密码，4-32位、字母、数字、下划线、减号',
  },
  nickname: {
    matches: /^[\d\w\u4e00-\u9fa5-_]{2,15}$/,
    message: '请输入正确的昵称，2-32位、中文、字母、数字，下划线、减号',
  },
  type: {
    isIn: typeEnum,
    message: `请选择正确的${typeComment}`,
  },
});

export class FilesDto extends CommonDto {
  @ApiProperty({ description: '文件名' })
  name: string;

  @ApiProperty({ description: '文件地址' })
  url: string;

  @ApiProperty({ enum: typeEnum, description: typeComment })
  type: string;

  @ApiProperty({ description: '文件大小' })
  size: string;

  @ApiProperty({ description: '上传帐号' })
  username: string;
}

export class FilesPaginationDto {
  @ApiProperty({ description: '列表', type: [FilesDto] })
  list: FilesDto[];

  @ApiProperty({ description: '总数' })
  total: number;
}

export class QueryFilesDto extends QueryPaginationDto {}

export class CreateFilesDto {
  @ApiProperty({ description: '文件名' })
  name: string;

  @ApiProperty({ description: '文件地址' })
  url: string;

  @IsInt()
  @ApiProperty({ description: '文件大小' })
  size: number;
}

export class FilesUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class FilesUrlDto {
  @ApiProperty({ description: '文件地址' })
  url: string;
}
