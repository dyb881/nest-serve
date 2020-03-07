import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransformClassToPlain } from 'class-transformer';
import { AccountQueryDto, AccountCreateDto, AccountUpdateDto } from './account.dto';
import { Account } from './account.entity';
import { CommonService, insLike } from '../../common';
import { sha512 } from 'js-sha512';
import { pick } from 'lodash';

@Injectable()
export class AccountService extends CommonService<Account, any, any, AccountUpdateDto> {
  constructor(@InjectRepository(Account) readonly accountRepository: Repository<Account>) {
    super(accountRepository);
  }

  async pagination(data: AccountQueryDto) {
    insLike(data, ['username', 'nickname']);
    return super.pagination(data);
  }

  async create(data: AccountCreateDto & { reg_ip: string }) {
    const one = await this.accountRepository.findOne(pick(data, ['username']));
    if (one) throw new BadRequestException('用户名已存在');
    await super.create(data);
  }

  @TransformClassToPlain()
  async validate(username: string, password: string) {
    const one = await this.accountRepository.findOne({ username });
    if (one?.password === sha512(password)) return one;
  }

  async login(account: Account) {
    await this.accountRepository.save(account);
  }
}
