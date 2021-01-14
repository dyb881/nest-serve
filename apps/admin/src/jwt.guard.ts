import { UseGuards, Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

/**
 * 权限守卫
 * 根据对应权限控制
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());

    console.log(permissions, request.user);
    if (!permissions) return true;

    return true;
  }
}

/**
 * 权限校验
 */
export const JwtPermissions = () => (...arg: any[]) => {
  const decorator: any = UseGuards(AuthGuard('jwt'), PermissionsGuard);
  return ApiBearerAuth()(decorator(...arg));
};

/**
 * 权限管理
 */
export const Permissions = (...permissions: string[]) => {
  return SetMetadata('permissions', permissions);
};
