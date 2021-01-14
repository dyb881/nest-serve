import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransformClassToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { CommonService, insLike, insNull } from '@app/service-tool';
import { AccountQueryDto, AccountCreateDto, AccountUpdateDto, LoginDto } from './account.dto';
import { Account, accountStatus } from './account.entity';
import { pick, omit } from 'lodash';
import { sha512 } from 'js-sha512';

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

  @TransformClassToPlain()
  async login<T extends Repository<any>>(repository: T, { username, password }: LoginDto) {
    const one = await repository
      .createQueryBuilder('alias')
      .innerJoinAndSelect('alias.account', 'account')
      .where('account.username = :username', { username })
      .getOne();

    if (!one || one.account.password !== sha512(password)) throw new UnauthorizedException('登录失败');
    if (one.account.status !== 1) throw new UnauthorizedException(`该账号${accountStatus[one.account.status]}`);

    return one;
  }
}
