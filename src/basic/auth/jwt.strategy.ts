import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 忽略过期
      secretOrKey: jwtConstants.secret,
    });
  }

  validate({ username, type, ...token }: any) {
    return { id: token[`key-${jwtConstants.secret}`], username, type };
  }
}
