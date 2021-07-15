import { Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService, private readonly configService: ConfigService) {}

  @Get()
  getHello(): string {
    const serve = this.configService.get('serve');
    console.log(serve);
    return this.accountService.getHello();
  }
}
