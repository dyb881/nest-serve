import { ApiProperty, ApiPropertyEnum, IsOptional, ToNumber } from '@app/decorator';
import { PaginationDto, PaginationQueryDto } from '@app/dto-tool';
import { Information } from './information.entity';
import { infoStatus } from '../category/category.entity';
import { status } from '../category/category.dto';
import { InfosBaseCreateDto } from '../category/category.base.dto';

export class InformationPaginationDto extends PaginationDto(Information) {}

export class InformationQueryDto extends PaginationQueryDto {
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

  @ApiProperty('分类ID', { required: false })
  categoryId: string;
}

export class InformationCreateDto extends InfosBaseCreateDto {
  @ApiProperty('分类ID')
  categoryId: string;
}

export class InformationUpdateDto extends InformationCreateDto {}
