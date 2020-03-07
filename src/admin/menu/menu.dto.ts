import { ApiProperty, PaginationQueryDto, IsInt } from '../../common';

export class MenuQueryDto extends PaginationQueryDto {
  @ApiProperty('标题', { required: false })
  title?: string;

  @ApiProperty('内容', { required: false })
  content?: string;

  @ApiProperty('是否显示', { required: false })
  show?: boolean;
}

export class MenuCreateDto {
  @ApiProperty('上级 ID', { required: false })
  pid?: string;

  @ApiProperty('标题')
  title: string;

  @ApiProperty('图标', { required: false })
  icon?: string;

  @ApiProperty('内容', { required: false })
  content?: string;

  @IsInt('排序号')
  @ApiProperty('排序号')
  sort: number;

  @ApiProperty('是否显示')
  show: boolean;
}

export class MenuUpdateDto extends MenuCreateDto {}
