import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * 权限守卫
 * 根据对应权限控制
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    // 判断是否绑定守卫
    if (!permissions) return true;
    const [accountType, ...roles] = permissions;

    const request = context.switchToHttp().getRequest();
    const { type } = request.user;

    // 判断帐号类型是否正确
    if (type !== accountType) return false;

    // 角色权限判断
    if (roles.length) {
    }

    return true;
  }
}

/**
 * 管理员守卫
 * 只有管理员才能访问该控制器
 */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.user.type === 'admin';
  }
}
