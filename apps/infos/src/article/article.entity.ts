import { Entity } from 'typeorm';
import { Column, ApiProperty } from '@app/public-decorator';
import { InfoArticleEntity } from '@app/public-class';

/**
 * 数据实体
 */
@Entity()
export class Article extends InfoArticleEntity {
  @ApiProperty('分类ID')
  @Column('分类ID', 36, { nullable: true })
  categoryId: string;
}
