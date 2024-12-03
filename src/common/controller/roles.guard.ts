import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext, LoggerService, Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { get } from 'lodash';

/**
 * 权限管理
 */
export const Roles = Reflector.createDecorator<string[]>();

/**
 * 权限守卫
 * 根据对应权限控制
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly loggerService: LoggerService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();

    // 无权限标识的接口，直接通过
    if (!roles) return true;

    try {
      // 获取角色权限配置
      const permissionsString = await this.cacheManager.get<string>(`permissions-${request.user.id}`);

      // 无缓存权限，直接拦截
      if (!permissionsString) return false;

      const permissions = JSON.parse(permissionsString);
      const key = roles.map((i) => i.toLowerCase()).join('.');

      // 校验权限是否开启
      return get(permissions, key);
    } catch (e) {
      this.loggerService.error(e, '权限解析异常');
    }

    return false;
  }
}
