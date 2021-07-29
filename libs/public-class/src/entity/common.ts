import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@app/public-decorator';
import { dateTransformer } from '@app/public-tool';

/**
 * 公用实体
 * 一条数据必须存在的属性
 */
export class CommonEntity {
  @ApiProperty('ID')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty('创建时间')
  @CreateDateColumn({ comment: '创建时间', transformer: dateTransformer })
  create_date: Date;

  @ApiProperty('更新时间')
  @UpdateDateColumn({ comment: '更新时间', transformer: dateTransformer })
  update_date: Date;
}
