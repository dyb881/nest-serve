import { Entity } from 'typeorm';
import { Column, ColumnJson, ApiProperty } from '@app/public-decorator';
import { CommonEntity } from '@app/public-class';

@Entity()
export class AdminRole extends CommonEntity {
  @ApiProperty('角色名称')
  @Column('角色名称')
  name: string;

  @ApiProperty('权限配置')
  @ColumnJson('权限配置')
  permissions: any;
}
