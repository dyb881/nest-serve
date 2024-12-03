import { DtoParam } from '../tools';
import { INFOS_STATUS } from '../entity/infos';

// ------------------------ 基础信息 ------------------------ //

export class InfoBasicQueryDto {
  @DtoParam('标题', { required: false })
  title?: string;

  @DtoParam('状态', { enum: INFOS_STATUS, isInt: true, required: false })
  status?: number;
}

export class InfoBasicCreateDto {
  @DtoParam('标题')
  title: string;

  @DtoParam('图标', { required: false })
  icon?: string;

  @DtoParam('优先级', { isInt: true, required: false })
  priority: number;

  @DtoParam('状态', { enum: INFOS_STATUS, isInt: true })
  status: number;
}

export class InfoBasicUpdateDto extends InfoBasicCreateDto {}

// ------------------------ 基础信息 ------------------------ //

// ------------------------ 信息分类 ------------------------ //

export class InfoCategoryQueryDto extends InfoBasicQueryDto {
  @DtoParam('上级ID', { required: false })
  parentId?: string;
}

export class InfoCategoryCreateDto extends InfoBasicCreateDto {
  @DtoParam('上级ID', { required: false })
  parentId?: string;
}

export class InfoCategoryUpdateDto extends InfoCategoryCreateDto {}

// ------------------------ 信息分类 ------------------------ //

// ------------------------ 文章信息 ------------------------ //

export class InfoArticleQueryDto extends InfoBasicQueryDto {
  @DtoParam('简介', { required: false })
  summary?: string;

  @DtoParam('内容', { required: false })
  content?: string;
}

export class InfoArticleCreateDto extends InfoBasicCreateDto {
  @DtoParam('图组', { required: false })
  pictureGroup?: string[];

  @DtoParam('简介', { required: false })
  summary?: string;

  @DtoParam('内容', { required: false })
  content?: string;

  @DtoParam('热度', { isInt: true, required: false })
  hot: number;
}

export class InfoArticleUpdateDto extends InfoArticleCreateDto {}

// ------------------------ 文章信息 ------------------------ //
