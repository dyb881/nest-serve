import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransformClassToPlain } from 'class-transformer';
import { AccountQueryDto, AccountCreateDto, AccountUpdateDto } from './account.dto';
import { Account } from './account.entity';
import { pagination } from '../../common';
import { sha512 } from 'js-sha512';
import { pick } from 'lodash';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(Account) private readonly accountRepository: Repository<Account>) {}

  @TransformClassToPlain()
  async pagination({ current, pageSize, ...data }: AccountQueryDto) {
    const [list, total] = await pagination(this.accountRepository, { current, pageSize }, data);
    return { list, total };
  }

  @TransformClassToPlain()
  async findOne(id: string) {
    const one = await this.accountRepository.findOne(id);
    if (!one) throw new BadRequestException('该数据不存在');
    return one;
  }

  async create(data: AccountCreateDto & { reg_ip: string }) {
    const one = await this.accountRepository.findOne(pick(data, ['username']));
    if (one) throw new BadRequestException('用户名已存在');
    await this.accountRepository.save(data);
  }

  async update(id: string, data: AccountUpdateDto) {
    const one = await this.findOne(id);
    Object.assign(one, data);
    await this.accountRepository.save(one);
  }

  async delete(ids: string[]) {
    if (!ids?.length) throw new BadRequestException('ids 不可为空');
    await this.accountRepository.delete(ids);
  }

  @TransformClassToPlain()
  async validate(username: string, password: string) {
    const one = await this.accountRepository.findOne({ username });
    if (one?.password === sha512(password)) return one;
  }

  async login(account: Account) {
    console.log(account);
    await this.accountRepository.save(account);
  }
}
