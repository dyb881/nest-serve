import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransformClassToPlain } from 'class-transformer';
import { Account } from './account.entity';
import { QueryAccountDto, CreateAccountDto, UpdateAccountDto } from './account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly repository: Repository<Account>
  ) {}

  @TransformClassToPlain()
  async findAll(queryData: QueryAccountDto) {
    const [list, count] = await this.repository.findAndCount(queryData);
    return { list, count };
  }

  @TransformClassToPlain()
  async findOne(id: string) {
    const one = await this.repository.findOne(id);
    if (!one) throw new BadRequestException('该数据不存在');
    return one;
  }

  async create(data: CreateAccountDto & { readonly reg_ip: string }) {
    const { password, username } = data;
    const one = await this.repository.findOne({ username });
    if (one) throw new BadRequestException('用户名已存在');
    const account = new Account();
    Object.assign(account, data);
    await this.repository.save(account);
  }

  async update(id: string, data: UpdateAccountDto) {
    const one = await this.findOne(id);
    Object.assign(one, data);
    await this.repository.save(one);
  }

  async remove(id: string) {
    const one = await this.findOne(id);
    await this.repository.remove(one);
  }
}
