import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  getHello(): string {
    return 'Hello World!';
  }
}
