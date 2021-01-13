import { Injectable } from '@nestjs/common';
import { HttpService } from '@app/http';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  validate(username: string, password: string) {
    return this.httpService.post('/admin/login', { username, password });
  }
}
