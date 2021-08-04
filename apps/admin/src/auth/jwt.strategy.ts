import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 忽略过期
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  validate({ username, roleId, ...token }: any) {
    return { id: token[`key-${this.configService.get('jwt.secret')}`], username, roleId };
  }
}
