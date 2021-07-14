import { Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getHello(): string {
    return this.accountService.getHello();
  }
}
