import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 忽略过期
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate({ accountId, username, ...token }: any) {
    return { id: token[`key-${process.env.JWT_SECRET}`], accountId, username };
  }
}
