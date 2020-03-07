import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountDto } from '../account/account.dto';
import { jwtConstants } from '../../common';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getToken({ id, username, type }: AccountDto) {
    return this.jwtService.sign({ [`key-${jwtConstants.secret}`]: id, username, type });
  }
}
