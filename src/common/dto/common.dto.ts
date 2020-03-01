import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * 公用对象
 */
export class CommonDto {
  @ApiProperty({ description: 'ID' })
  id: string;

  @ApiProperty({ description: '创建时间' })
  create_date: Date;

  @ApiProperty({ description: '更新时间' })
  update_date: Date;
}

/**
 * 查询分页对象
 */
export class QueryPaginationDto {
  @Type(() => Number)
  @IsInt({ message: 'current 只能为数字' })
  @ApiProperty({ description: '当前页码', default: 1 })
  readonly current: number;

  @Type(() => Number)
  @IsInt({ message: 'pageSize 只能为数字' })
  @ApiProperty({ description: '每页数量', default: 10 })
  readonly pageSize: number;
}
