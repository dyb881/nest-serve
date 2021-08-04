import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('ACCOUNT_SERVICE') private readonly client: ClientProxy) {
    super();
  }

  validate(username: string, password: string) {
    return lastValueFrom(this.client.send('AccountAdmin.login', { username, password }));
  }
}
