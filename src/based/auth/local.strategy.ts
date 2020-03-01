import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '../account/account.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountService: AccountService) {
    super();
  }

  async validate(username: string, password: string) {
    const account = await this.accountService.validate(username, password);
    if (!account) throw new UnauthorizedException('登录失败');
    return account;
  }
}




