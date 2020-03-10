import { IsOptional } from 'class-validator';
import { ApiProperty, PaginationQueryDto, IsInt, ApiPropertyEnum, menuStatus, IsIn } from '../../common';

export class MenuQueryDto extends PaginationQueryDto {
  @ApiProperty('标题', { required: false })
  title?: string;

  @ApiProperty('内容', { required: false })
  content?: string;

  @IsOptional()
  @IsIn(menuStatus, '请选择正确的状态')
  @ApiPropertyEnum('状态', menuStatus, { required: false })
  status?: boolean;
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

  @IsIn(menuStatus, '请选择正确的状态')
  @ApiPropertyEnum('状态', menuStatus)
  status: boolean;
}

export class MenuUpdateDto extends MenuCreateDto {}
