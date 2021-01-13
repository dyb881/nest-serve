import { ApiProperty, ApiPropertyEnum, IsNotEmpty, IsIn, IsInt } from '@app/decorator';
import { infoStatus } from './category.entity';

export const status = IsIn(infoStatus, '状态');

export class InfosBaseCreateDto {
  @IsNotEmpty('标题')
  @ApiProperty('标题')
  title: string;

  @ApiProperty('图标', { required: false })
  icon?: string;

  @ApiProperty('图组', { required: false })
  picture_group?: string[];

  @ApiProperty('简介', { required: false })
  summary?: string;

  @ApiProperty('内容', { required: false })
  content?: string;

  @IsInt('热度')
  @ApiProperty('热度')
  hot: number;

  @IsInt('优先级')
  @ApiProperty('优先级')
  priority: number;

  @status
  @ApiPropertyEnum('状态', infoStatus)
  status: number;
}
