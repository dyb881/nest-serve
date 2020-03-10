import { IsOptional } from 'class-validator';
import { ApiProperty, PaginationQueryDto, IsInt, ApiPropertyEnum, infoStatus, IsIn } from '../../common';

export class InfoQueryDto extends PaginationQueryDto {
  @ApiProperty('标题', { required: false })
  title?: string;

  @ApiProperty('简介', { required: false })
  summary?: string;

  @ApiProperty('内容', { required: false })
  content?: string;

  @IsOptional()
  @IsIn(infoStatus, '请选择正确的状态')
  @ApiPropertyEnum('状态', infoStatus, { required: false })
  status?: boolean;
}

export class InfoCreateDto {
  @ApiProperty('所属菜单 ID')
  menu_id: string;

  @ApiProperty('标题')
  title: string;

  @ApiProperty('图标', { required: false })
  icon: string;

  @ApiProperty('图组', { required: false })
  picture_group: string[];

  @ApiProperty('简介', { required: false })
  summary: string;

  @ApiProperty('内容', { required: false })
  content: string;

  @IsInt('排序号')
  @ApiProperty('排序号')
  sort: number;

  @IsInt('热度')
  @ApiProperty('热度', { default: 0 })
  hot: number;

  @IsIn(infoStatus, '请选择正确的状态')
  @ApiPropertyEnum('状态', infoStatus)
  status: number;
}

export class InfoUpdateDto extends InfoCreateDto {}
