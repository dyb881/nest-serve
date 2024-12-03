import { INestApplication, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AdminService } from '../account/admin/admin.service';
import { RoleService } from '../account/role/role.service';
import { Permissions } from '../account/role/role.entity';

/**
 * 初始化项目
 * 新项目的情况下创建初始角色与帐号
 */
export const initialize = async (app: INestApplication) => {
  // 插入日志
  const loggerService = await app.resolve<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(loggerService);

  // ------------------------------ 角色自检 start ------------------------------ //

  const roleService = await app.resolve<RoleService>(RoleService);
  let [role] = await roleService.getList({});
  if (!role) {
    loggerService.log('当前无角色数据', '角色自检');
    loggerService.log('创建默认角色：超级管理员', '角色自检');
    loggerService.log('权限范围：所有', '角色自检');
    const permissions = new Permissions(true); // 默认权限
    await roleService.create({ name: '超级管理员', permissions });
    const roles = await roleService.getList({});
    role = roles[0];
    loggerService.log('默认角色创建成功', '角色自检');
  }

  // ------------------------------ 角色自检  end  ------------------------------ //

  // ------------------------------ 帐号自检 start ------------------------------ //

  const adminService = await app.resolve<AdminService>(AdminService);

  const list = await adminService.getList({});
  loggerService.log(`当前存在${list.length}个管理员帐号`, '帐号自检');

  if (list.length === 1 && list[0].username === 'admin') {
    loggerService.log('正在使用默认管理员帐号，请及时创建新的管理员帐号，删除默认帐号', '帐号自检');
    loggerService.log('默认帐号：admin', '帐号自检');
    loggerService.log('默认密码：admin', '帐号自检');
    return;
  }

  if (list.length === 0) {
    loggerService.log('当前无管理员帐号，自动创建默认帐号', '帐号自检');
    await adminService.create({
      username: 'admin',
      password: 'admin',
      phone: '15118888888',
      nickname: '超级管理员',
      avatar: '',
      roleId: role.id,
      status: 1,
    });
    loggerService.log('默认帐号创建成功', '帐号自检');
    loggerService.log('默认帐号：admin', '帐号自检');
    loggerService.log('默认密码：admin', '帐号自检');
  }

  // ------------------------------ 帐号自检  end  ------------------------------ //
};
