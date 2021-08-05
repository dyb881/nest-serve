import { ApiProperty, IsInt, ToNumber } from '@app/public-decorator';

/**
 * 分页对象
 */
export function PaginationDto<Dto>(_Dto: Dto) {
  class PaginationDto {
    @ApiProperty('列表', { type: [_Dto] })
    list: Dto[];

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
 * 查询分页对象
 */
export function PaginationQueryDtoExtends(_Dto: any) {
  class PaginationQueryDto extends _Dto {
    @ToNumber()
    @IsInt('当前页码')
    @ApiProperty('当前页码', { default: 1 })
    current: number;

    @ToNumber()
    @IsInt('每页数量')
    @ApiProperty('每页数量', { default: 10 })
    pageSize: number;
  }

  return class extends PaginationQueryDto {};
}

/**
 * ID 数组
 */
export class IdsDto {
  @ApiProperty('ID数组')
  ids: string[];
}
