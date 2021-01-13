import { Entity } from 'typeorm';
import { Column, ApiProperty } from '@app/decorator';
import { InfosBase } from '../category/category.entity';

@Entity()
export class Information extends InfosBase {
  @ApiProperty('分类ID')
  @Column('分类ID', 36)
  categoryId: string;
}
