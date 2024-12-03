import { Inject, Body, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ApiPath, Method, AccountEntity, AccountLoginDto } from '../../common';

import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';

import { Admin } from '../admin/admin.entity';
import { AdminAuthDto, AdminDto, UserAuthDto, UserDto } from './auth.dto';

@ApiPath('auth', '鉴权')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  /**
   * 生成加密串
   */
  getToken(account: AccountEntity) {
    const { id, username } = account;
    const key = `secret-${this.configService.get('jwt.validateKey')}`;
    return this.jwtService.sign({ [key]: id, username });
  }

  async getAdminRole(admin: Admin) {
    const role = await this.roleService.get(admin.roleId);

    // 账号权限写入缓存
    const expiresIn = this.configService.get<number>('jwt.expiresIn');
    await this.cacheManager.set(`permissions-${admin.id}`, JSON.stringify(role.permissions), expiresIn);

    return role;
  }

  @Method('管理员登录', ['Post', 'admin'], { res: AdminAuthDto })
  async admin(@Body() data: AccountLoginDto) {
    const admin = await this.adminService.login(data);

    // 获取鉴权 token
    const access_token = this.getToken(admin);

    // 查询角色信息
    const role = await this.getAdminRole(admin);

    return { ...admin, access_token, role };
  }

  @Method('获取管理员帐号信息', ['Get', 'admin'], { res: AdminDto, auth: true })
  async getAdminInfo(@Req() req: any) {
    const admin = await this.adminService.get(req.user.id);

    // 查询角色信息
    const role = await this.getAdminRole(admin);

    return { ...admin, role };
  }

  @Method('用户登录', ['Post', 'user'], { res: UserAuthDto })
  async user(@Body() data: AccountLoginDto) {
    const user = await this.userService.login(data);

    // 获取鉴权 token
    const access_token = this.getToken(user);

    return { ...user, access_token };
  }

  @Method('获取用户帐号信息', ['Get', 'user'], { res: UserDto, auth: true })
  async getUserInfo(@Req() req: any) {
    const user = await this.userService.get(req.user.id);

    return { ...user };
  }
}
