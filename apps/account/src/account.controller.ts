import { Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@app/public-module';

@Controller()
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService
  ) {}

  @Get()
  getHello() {
    const serve = this.configService.get('serve');
    this.loggerService.log(serve, '测试');
    return this.accountService.getHello();
  }
}
