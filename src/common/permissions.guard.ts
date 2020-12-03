import { UseGuards, Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

/**
 * 权限管理
 * accountType 帐号类型
 * roles       角色
 */
export const Permissions = (accountType: string, ...roles: string[]) => {
  return SetMetadata('permissions', [accountType, ...roles]);
};

/**
 * 登录权限校验
 */
export const Jwt = (...guards: (Function | CanActivate)[]) => (...arg: any[]) => {
  const res: any = UseGuards(AuthGuard('jwt'), ...guards);
  return ApiBearerAuth()(res(...arg));
};

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
 * 权限校验
 */
export const JwtPermissions = () => Jwt(PermissionsGuard);

/**
 * 管理员守卫
 * 只有管理员才能访问该控制器
 */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    const types = ['admin'];

    // 追加帐号类型判断
    if (permissions) {
      const [accountType] = permissions;
      types.push(accountType);
    }

    const request = context.switchToHttp().getRequest();
    return types.includes(request.user.type);
  }
}

/**
 * 管理员权限校验
 */
export const JwtAdmin = () => Jwt(AdminGuard);
