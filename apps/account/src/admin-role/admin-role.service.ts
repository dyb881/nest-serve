import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CrudService } from '@app/public-class';
import { AdminRoleCreateDto, AdminRoleUpdateDto } from './admin-role.dto';
import { AdminRole } from './admin-role.entity';

@Injectable()
export class AdminRoleService extends CrudService<AdminRoleCreateDto, AdminRoleUpdateDto>(AdminRole) {
  constructor(
    @InjectRepository(AdminRole) readonly adminRoleRepository: Repository<AdminRole>,
    readonly configService: ConfigService
  ) {
    super(adminRoleRepository);
  }

  /**
   * 获取权限配置
   */
  getPermissionConfig() {
    const { actions, apps } = this.configService.get<any>('permission');

    const permissionAction: any = {};
    for (let action of actions) {
      permissionAction[action] = false;
    }

    const permission: any = {};

    for (let [key, app] of Object.entries<any>(apps)) {
      permission[key] = {};
      for (let modular of app) {
        permission[key][modular] = permissionAction;
      }
    }

    return permission;
  }
}
