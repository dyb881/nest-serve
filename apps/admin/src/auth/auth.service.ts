import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@app/http';
import { toIp, format } from '@app/data-tool';
import { AccountAdmin } from 'apps/account/src/account-admin/account-admin.entity';
import { Account } from 'apps/account/src/account/account.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly httpService: HttpService) {}

  /**
   * 生成加密串
   */
  getToken(accountAdmin: AccountAdmin) {
    const { id, roleId, account } = accountAdmin;
    return this.jwtService.sign({
      [`key-${process.env.JWT_SECRET}`]: id,
      roleId,
      accountId: account.id,
      username: account.username,
    });
  }

  /**
   * 保存登录信息
   */
  async saveLogin(account: Account, ip: string) {
    // 注入登录IP和登录时间
    Object.assign(account, { login_ip: toIp(ip), login_date: format(new Date()) });

    // 保存登录IP和登录时间
    await this.httpService.put(`/account/${account.id}`, account);
  }

  /**
   * 获取管理员信息
   */
  getAdmin(id: string) {
    return this.httpService.get(`/admin/${id}`);
  }

  /**
   * 获取角色信息
   */
  getRole(id: string) {
    return this.httpService.get(`/role-admin/${id}`);
  }
}
