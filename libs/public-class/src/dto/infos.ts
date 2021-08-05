import { ApiProperty, ApiPropertyEnum, IsOptional, ToNumber, IsNotEmpty, IsIn, IsInt } from '@app/public-decorator';
import { INFOS_STATUS } from '../entity';

/**
 * 属性验证
 */
export const ValidatorCategory = {
  STATUS: IsIn(INFOS_STATUS, '状态'),
};

// ------------------------ 基础信息 ------------------------ //

export class InfoBasicQueryDto {
  @ApiProperty('标题', { required: false })
  title?: string;

  @ToNumber()
  @IsOptional()
  @ValidatorCategory.STATUS
  @ApiPropertyEnum('状态', INFOS_STATUS, { required: false })
  status?: boolean;
}

export class InfoBasicCreateDto {
  @IsNotEmpty('标题')
  @ApiProperty('标题')
  title: string;

  @ApiProperty('图标', { required: false })
  icon?: string;

  @IsInt('优先级')
  @ApiProperty('优先级', { required: false })
  priority: number;

  @ValidatorCategory.STATUS
  @ApiPropertyEnum('状态', INFOS_STATUS)
  status: number;
}

export class InfoBasicUpdateDto extends InfoBasicCreateDto {}

// ------------------------ 基础信息 ------------------------ //

// ------------------------ 信息分类 ------------------------ //

export class InfoCategoryQueryDto extends InfoBasicQueryDto {
  @ApiProperty('上级ID', { required: false })
  parentId?: string;
}

export class InfoCategoryCreateDto extends InfoBasicCreateDto {
  @ApiProperty('上级ID', { required: false })
  parentId?: string;
}

export class InfoCategoryUpdateDto extends InfoCategoryCreateDto {}

// ------------------------ 信息分类 ------------------------ //

// ------------------------ 文章信息 ------------------------ //

export class InfoArticleQueryDto extends InfoBasicQueryDto {
  @ApiProperty('简介', { required: false })
  summary?: string;

  @ApiProperty('内容', { required: false })
  content?: string;
}

export class InfoArticleCreateDto extends InfoBasicCreateDto {
  @ApiProperty('图组', { required: false })
  pictureGroup?: string[];

  @ApiProperty('简介', { required: false })
  summary?: string;

  @ApiProperty('内容', { required: false })
  content?: string;

  @IsInt('热度')
  @ApiProperty('热度', { required: false })
  hot: number;
}

export class InfoArticleUpdateDto extends InfoArticleCreateDto {}

// ------------------------ 文章信息 ------------------------ //
