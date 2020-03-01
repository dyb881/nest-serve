import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransformClassToPlain } from 'class-transformer';
import { Account } from './account.entity';
import { QueryAccountDto, CreateAccountDto, UpdateAccountDto } from './account.dto';
import { pagination } from '../../common';
import { sha512 } from 'js-sha512';
import { pick } from 'lodash';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(Account) private readonly repository: Repository<Account>) {}

  @TransformClassToPlain()
  async findAndCount(data: QueryAccountDto) {
    const [list, total] = await pagination(this.repository, data);
    return { list, total };
  }

  @TransformClassToPlain()
  async findOne(id: Partial<Account>) {
    const one = await this.repository.findOne(id);
    if (!one) throw new BadRequestException('该数据不存在');
    return one;
  }

  async create(data: CreateAccountDto & { readonly reg_ip: string }) {
    const one = await this.repository.findOne(pick(data, ['username']));
    if (one) throw new BadRequestException('用户名已存在');
    await this.repository.save(data);
  }

  async update(id: string, data: UpdateAccountDto) {
    const one = await this.findOne({ id });
    Object.assign(one, data);
    await this.repository.save(one);
  }

  async remove(id: string) {
    const one = await this.findOne({ id });
    await this.repository.remove(one);
  }

  @TransformClassToPlain()
  async validate(username: string, password: string) {
    const one = await this.repository.findOne({ username });
    if (one?.password === sha512(password)) return one;
  }
}
