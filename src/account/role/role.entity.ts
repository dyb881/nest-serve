import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity, EntityColumn } from '../../common';

/**
 * 权限动作
 */
export class Actions {
  constructor(defaultPermissions = false) {
    this.query = defaultPermissions;
    this.create = defaultPermissions;
    this.update = defaultPermissions;
    this.delete = defaultPermissions;
  }

  @ApiProperty({ description: '查询' })
  query: boolean;

  @ApiProperty({ description: '创建' })
  create: boolean;

  @ApiProperty({ description: '更新' })
  update: boolean;

  @ApiProperty({ description: '删除' })
  delete: boolean;
}

/**
 * 权限配置（模块名称：权限动作）
 */
export class Permissions {
  constructor(defaultPermissions?: boolean) {
    this.role = new Actions(defaultPermissions);
    this.admin = new Actions(defaultPermissions);
    this.user = new Actions(defaultPermissions);
    this.category = new Actions(defaultPermissions);
    this.article = new Actions(defaultPermissions);
  }

  @ApiProperty({ description: '角色管理' })
  role: Actions;

  @ApiProperty({ description: '管理员帐号管理' })
  admin: Actions;

  @ApiProperty({ description: '用户帐号管理' })
  user: Actions;

  @ApiProperty({ description: '分类管理' })
  category: Actions;

  @ApiProperty({ description: '文章管理' })
  article: Actions;
}

/**
 * 角色
 */
@Entity()
export class Role extends CommonEntity {
  @EntityColumn('角色名称')
  name: string;

  @EntityColumn('权限配置', { type: 'simple-json' })
  permissions: Permissions;
}
