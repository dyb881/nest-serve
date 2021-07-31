import { ApiProperty, IsInt, ToNumber } from '@app/public-decorator';

/**
 * 分页对象
 */
export function PaginationDto<T>(Dto: T) {
  class PaginationDto {
    @ApiProperty('列表', { type: [Dto] })
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
  @ToNumber()
  @IsInt('当前页码')
  @ApiProperty('当前页码', { default: 1 })
  current: number;

  @ToNumber()
  @IsInt('每页数量')
  @ApiProperty('每页数量', { default: 10 })
  pageSize: number;
}

/**
 * ID 数组
 */
export class IdsDto {
  @ApiProperty('ID数组')
  ids: string[];
}
