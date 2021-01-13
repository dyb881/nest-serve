import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService, insLike, insNull } from '@app/service-tool';
import { AccountQueryDto, AccountCreateDto, AccountUpdateDto } from './account.dto';
import { Account } from './account.entity';
import { pick, omit } from 'lodash';

@Injectable()
export class AccountService extends CommonService<Account, any, any, AccountUpdateDto> {
  constructor(@InjectRepository(Account) readonly accountRepository: Repository<Account>) {
    super(accountRepository);
  }

  pagination(data: AccountQueryDto) {
    insLike(data, ['username', 'phone', 'nickname']);
    return super.pagination(data);
  }

  async create(data: AccountCreateDto) {
    await this.isUsernameExist(data.username);
    await super.create(data);
  }

  async update(id: string, data: AccountUpdateDto) {
    insNull(data, ['phone', 'avatar']);
    delete (data as any).type; // 不允许更改帐号类型
    await super.update(id, data);
  }

  async isUsernameExist(username: string) {
    const one = await this.accountRepository.findOne({ username });
    if (one) throw new BadRequestException('用户名已存在');
  }

  fields = [
    'username',
    'password',
    'phone',
    'nickname',
    'avatar',
    'reg_ip',
    'login_ip',
    'login_date',
    'type',
    'status',
  ];

  /**
   * 转为子账号数据
   */
  toSubAccountData<T extends object>(data: T): any {
    const account = pick(data, this.fields);
    const other = omit(data, this.fields);
    Object.assign(other, { account });
    return other;
  }
}
