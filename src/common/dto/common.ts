import { DtoParam } from '../tools';

/**
 * 生成查询分页
 */
export const PaginationQueryDto = <Dto extends new (...args: any[]) => any>(_Dto: Dto) => {
  class PaginationQueryDto extends _Dto {
    @DtoParam('当前页码', { isInt: true, default: 1 })
    current: number;

    @DtoParam('每页数量', { isInt: true, default: 20 })
    pageSize: number;
  }
  return class extends PaginationQueryDto {};
};

/**
 * 分页数据
 */
export const PaginationDto = <Dto extends Function>(_Dto: Dto) => {
  class PaginationDto {
    @DtoParam('列表', { type: [_Dto] })
    list: Dto[];

    @DtoParam('总数')
    total: number;
  }
  return class extends PaginationDto {};
};

/**
 * ID 数组
 */
export class IdsDto {
  @DtoParam('ID数组')
  ids: string[];
}
