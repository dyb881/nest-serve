import { Type } from 'class-transformer';
import { ApiProperty, IsInt } from '../tool';

/**
 * 公用对象
 */
export class CommonDto {
  @ApiProperty('ID')
  id: string;

  @ApiProperty('创建时间')
  create_date: Date;

  @ApiProperty('更新时间')
  update_date: Date;
}

/**
 * 分页对象
 */
export function PaginationDto<T>(_Dto: T) {
  class PaginationDto {
    @ApiProperty('列表', { type: [_Dto] })
    list: T[];

    @ApiProperty('总数')
    total: number;
  }
  return class extends PaginationDto {};
}

/**
 * 查询分页对象
 */
export class PaginationQueryDto {
  @Type(() => Number)
  @IsInt('current 只能为数字')
  @ApiProperty('当前页码', { default: 1 })
  current: number;

  @Type(() => Number)
  @IsInt('pageSize 只能为数字')
  @ApiProperty('每页数量', { default: 10 })
  pageSize: number;
}

/**
 * 删除
 */
export class DeleteDto {
  @ApiProperty('ID 数组', { required: false })
  ids: string[];
}
