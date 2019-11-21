import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import moment from 'moment';

/**
 * 公用列配置
 */
export const commonColumn = {
  /**
   * 时间
   * 读取格式
   */
  date: {
    transformer: {
      to: value => value,
      from: value => value && moment(value).format('YYYY-MM-DD HH:mm:ss'),
    },
  },
  /**
   * IP 地址
   * 长度 和 过滤 ::ffff:
   */
  ip: {
    length: 15,
    transformer: {
      to: value =>
        typeof value === 'string' && value.includes('::ffff:')
          ? value.slice(7)
          : value,
      from: value => value,
    },
  },
};

/**
 * 公用实体
 */
export class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    comment: '创建时间',
    ...commonColumn.date,
  })
  create_date: number;

  @UpdateDateColumn({
    comment: '更新时间',
    ...commonColumn.date,
  })
  update_date: number;
}
