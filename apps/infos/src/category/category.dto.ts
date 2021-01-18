import { ApiProperty, ApiPropertyEnum, IsOptional, IsIn, ToNumber } from '@app/decorator';
import { infoStatus } from './category.entity';
import { InfosBaseCreateDto } from './category.base.dto';

export const status = IsIn(infoStatus, '状态');

export class CategoryQueryDto {
  @ApiProperty('标题', { required: false })
  title?: string;

  @ApiProperty('简介', { required: false })
  summary?: string;

  @ApiProperty('内容', { required: false })
  content?: string;

  @ToNumber()
  @IsOptional()
  @status
  @ApiPropertyEnum('状态', infoStatus, { required: false })
  status?: boolean;
}

export class CategoryCreateDto extends InfosBaseCreateDto {
  @ApiProperty('上级ID', { required: false })
  parentId?: string;
}

export class CategoryUpdateDto extends CategoryCreateDto {}
