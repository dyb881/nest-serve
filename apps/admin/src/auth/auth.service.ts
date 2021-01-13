import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@app/http';
import { toIp, format } from '@app/data-tool';
import { AccountAdmin } from 'apps/account/src/account-admin/account-admin.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly httpService: HttpService) {}

  async installToken(accountAdmin: AccountAdmin, ip: string) {
    const { id, account } = accountAdmin;

    // 生成加密串
    const access_token = await this.jwtService.sign({
      [`key-${process.env.JWT_SECRET}`]: id,
      accountId: account.id,
      username: account.username,
    });

    // 注入登录IP和登录时间
    Object.assign(account, { login_ip: toIp(ip), login_date: format(new Date()) });

    // 保存登录IP和登录时间
    await this.httpService.put(`/account/${account.id}`, account);

    Object.assign(accountAdmin, { access_token });
  }
}
