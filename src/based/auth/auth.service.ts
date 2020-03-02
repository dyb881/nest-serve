import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountDto } from '../account/account.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getToken(account: AccountDto) {
    const { id, username, type } = account;
    return { access_token: this.jwtService.sign({ sub: id, username, type }), ...account };
  }
}
