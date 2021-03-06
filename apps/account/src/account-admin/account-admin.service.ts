import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService, insNull, toLike, insWhereLike } from '@app/service-tool';
import { AccountAdminQueryDto, AccountAdminCreateDto, AccountAdminUpdateDto } from './account-admin.dto';
import { AccountAdmin } from './account-admin.entity';
import { AccountService } from '../account/account.service';
import { LoginDto } from '../account/account.dto';

@Injectable()
export class AccountAdminService extends CommonService<AccountAdmin> {
  relations = ['account'];

  constructor(
    @InjectRepository(AccountAdmin) readonly accountAdminRepository: Repository<AccountAdmin>,
    private readonly accountService: AccountService
  ) {
    super(accountAdminRepository);
  }

  pagination(data: AccountAdminQueryDto) {
    toLike(data, ['username', 'phone', 'nickname']);
    return super.paginationQueryBuilder(data, 'admin', (query, where) =>
      insWhereLike(query, where, [...this.accountService.fields.map((i) => `account.${i}`), 'admin.roleId'])
    );
  }

  async create(data: AccountAdminCreateDto) {
    await this.accountService.isUsernameExist(data.username);
    await super.create(this.accountService.toSubAccountData({ ...data, type: 'admin' }));
  }

  update(id: string, data: AccountAdminUpdateDto) {
    insNull(data, ['phone', 'avatar']);
    return super.update(id, this.accountService.toSubAccountData(data));
  }

  login(data: LoginDto) {
    return this.accountService.login(this.repository, data);
  }
}
