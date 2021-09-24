import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { format } from '@app/public-tool';
import { AccountAdmin } from 'apps/account/src/admin/admin.entity';
import { lastValueFrom } from 'rxjs';
import { AdminInfoDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('ACCOUNT_SERVICE') private readonly client: ClientProxy,
    @Inject(CACHE_MANAGER) private readonly cacheManager
  ) {}

  /**
   * 生成加密串
   */
  getToken(accountAdmin: AccountAdmin) {
    const { id, username } = accountAdmin;
    return this.jwtService.sign({
      [`secret-${this.configService.get('jwt.secret')}`]: id,
      username,
    });
  }

  /**
   * 登录
   */
  async login(req: any) {
    const { user, clientIp } = req;
    // 获取鉴权 token
    const access_token = this.getToken(user);

    // 注入登录IP和登录时间
    Object.assign(user, { login_ip: clientIp, login_date: format(new Date()) });

    // 保存登录信息
    await lastValueFrom(this.client.send('AccountAdmin.update', [user.id, user]));

    // 查询角色信息
    const role = await this.getRole(user);

    return { ...user, role, access_token };
  }

  /**
   * 获取账号信息
   */
  async getInfo(id: string) {
    // 查询角色信息
    const user = await lastValueFrom(this.client.send('AccountAdmin.get.one', id));

    // 查询角色信息
    const role = await this.getRole(user);

    return { ...user, role };
  }

  /**
   * 写入缓存
   */
  async getRole(user: AdminInfoDto) {
    const role = await lastValueFrom(this.client.send('AdminRole.get.one', user.roleId));

    // 账号权限写入缓存
    await this.cacheManager.set(`permissions-${user.id}`, role.permissions, {
      ttl: parseInt(this.configService.get('jwt.expiresIn')),
    });

    return role;
  }
}
