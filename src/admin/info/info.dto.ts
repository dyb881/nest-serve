import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PaginationQueryDto, IsInt, ApiPropertyEnum, dataStatus, IsIn } from '../../common';

export class InfoQueryDto extends PaginationQueryDto {
  @ApiProperty('标题', { required: false })
  title?: string;

  @ApiProperty('简介', { required: false })
  summary?: string;

  @ApiProperty('内容', { required: false })
  content?: string;

  @Type(() => Number)
  @IsOptional()
  @IsIn(dataStatus.info, '请选择正确的状态')
  @ApiPropertyEnum('状态', dataStatus.info, { required: false })
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

  @IsInt('优先级')
  @ApiProperty('优先级')
  priority: number;

  @IsInt('热度')
  @ApiProperty('热度', { default: 0 })
  hot: number;

  @IsIn(dataStatus.info, '请选择正确的状态')
  @ApiPropertyEnum('状态', dataStatus.info)
  status: number;
}

export class InfoUpdateDto extends InfoCreateDto {}
