import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { lastValueFrom } from 'rxjs';

export interface LocalStrategyOptions {
  token: string; // 鉴权的服务 key
  pattern: string; // 鉴权的微服务接口
}

/**
 * 登录校验
 */
export function LocalStrategy({ token, pattern }: LocalStrategyOptions) {
  class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(token) readonly client: ClientProxy) {
      super();
    }

    validate(username: string, password: string) {
      return lastValueFrom(this.client.send(pattern, { username, password }));
    }
  }

  return class extends LocalStrategy {};
}
