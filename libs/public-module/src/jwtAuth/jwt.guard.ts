import {
  UseGuards,
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { get } from 'lodash';

/**
 * 权限守卫
 * 根据对应权限控制
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, @Inject(CACHE_MANAGER) private readonly cacheManager) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());

    // 无权限标识的接口，直接通过
    if (permissions) {
      const [role] = permissions;

      // 获取角色权限配置
      const roles = await this.cacheManager.get(`permissions-${request.user.id}`);

      if (!get(roles, role)) return false;
    }

    return true;
  }
}

/**
 * 权限校验
 */
export const JwtPermissions = () => {
  return (...arg: any[]) => {
    const decorator: any = UseGuards(AuthGuard('jwt'), PermissionsGuard);
    return ApiBearerAuth()(decorator(...arg));
  };
};

/**
 * 权限管理
 */
export const Permissions = (...permissions: string[]) => {
  return SetMetadata('permissions', permissions);
};
