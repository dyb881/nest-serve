import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { dateTransformer } from '../tool';

/**
 * 公用实体
 */
export class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ comment: '创建时间', transformer: dateTransformer })
  create_date: Date;

  @UpdateDateColumn({ comment: '更新时间', transformer: dateTransformer })
  update_date: Date;
}
