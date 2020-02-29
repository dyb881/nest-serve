import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { columnOptions } from '../tool';
const { date } = columnOptions;

/**
 * 公用实体
 */
export class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ comment: '创建时间', ...date })
  create_date: Date;

  @UpdateDateColumn({ comment: '更新时间', ...date })
  update_date: Date;
}
