import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService, insNull, toLike, insWhereLike } from '@app/service-tool';
import { AccountUserQueryDto, AccountUserCreateDto, AccountUserUpdateDto } from './account-user.dto';
import { AccountUser } from './account-user.entity';
import { AccountService } from '../account/account.service';
import { LoginDto } from '../account/account.dto';

@Injectable()
export class AccountUserService extends CommonService<AccountUser> {
  relations = ['account'];

  constructor(
    @InjectRepository(AccountUser) readonly accountUserRepository: Repository<AccountUser>,
    private readonly accountService: AccountService
  ) {
    super(accountUserRepository);
  }

  pagination(data: AccountUserQueryDto) {
    toLike(data, ['username', 'phone', 'nickname']);
    return super.paginationQueryBuilder(data, 'user', (query, where) =>
      insWhereLike(query, where, [...this.accountService.fields.map((i) => `account.${i}`)])
    );
  }

  async create(data: AccountUserCreateDto) {
    await this.accountService.isUsernameExist(data.username);
    await super.create(this.accountService.toSubAccountData({ ...data, type: 'user' }));
  }

  update(id: string, data: AccountUserUpdateDto) {
    insNull(data, ['phone', 'avatar']);
    return super.update(id, this.accountService.toSubAccountData(data));
  }

  login(data: LoginDto) {
    return this.accountService.login(this.repository, data);
  }
}
