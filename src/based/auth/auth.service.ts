import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TransformClassToPlain } from 'class-transformer';
import { AccountService } from '../account/account.service';
import { AccountDto } from '../account/account.dto';
import { sha512 } from 'js-sha512';

@Injectable()
export class AuthService {
  constructor(private readonly accountService: AccountService, private readonly jwtService: JwtService) {}

  getToken({ id, username }: AccountDto) {
    return { access_token: this.jwtService.sign({ sub: id, username }) };
  }
}
