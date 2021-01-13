import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService, insNull, toLike, insWhereLike } from '@app/service-tool';
import { AccountAdminQueryDto, AccountAdminCreateDto, AccountAdminUpdateDto } from './account-admin.dto';
import { AccountAdmin } from './account-admin.entity';
import { AccountService } from '../account/account.service';

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
      insWhereLike(query, where, [...this.accountService.fields.map((i) => `account.${i}`), 'admin.roles'])
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

  async delete(ids: string[]) {
    const all = await this.findAll({ where: { id: ids } });
    await super.delete(ids);
    await this.accountService.delete(all.map((i) => i.account.id));
  }
}
