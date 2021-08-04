import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { pick } from 'lodash';

export interface JwtStrategyOptions {
  /**
   * 提取用户信息，每次请求都能得到
   * 不可填ID，在 this.jwtService.sign 时需要与之对应
   */
  picks: string[];
}

/**
 * 请求校验
 */
export function JwtStrategy({ picks }: JwtStrategyOptions) {
  @Injectable()
  class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(readonly configService: ConfigService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false, // 忽略过期
        secretOrKey: configService.get('jwt.secret'),
      });
    }

    validate(token: any) {
      return { id: token[`secret-${this.configService.get('jwt.secret')}`], ...pick(token, picks) };
    }
  }

  return class extends JwtStrategy {};
}
