import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  constructor() {}

  async getHello() {
    return 'Hello World!';
  }
}
