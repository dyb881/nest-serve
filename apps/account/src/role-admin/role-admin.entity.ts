import { Entity } from 'typeorm';
import { Column, ColumnJson, ApiProperty } from '@app/decorator';
import { CommonEntity } from '@app/entity-tool';

type TPermission = { query?: boolean; create?: boolean; update?: boolean; delete?: boolean };
export type TPermissions = { [key: string]: { [key: string]: TPermission } };

@Entity()
export class RoleAdmin extends CommonEntity {
  @ApiProperty('角色名称')
  @Column('角色名称')
  name: string;

  @ApiProperty('权限配置')
  @ColumnJson('权限配置')
  permissions: TPermissions;
}
