import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AdminEntity,
  QueryAdminData,
  CreateAdminData,
  UpdateAdminData,
} from './common';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly repository: Repository<AdminEntity>,
  ) {}

  async findAll(queryData: QueryAdminData) {
    const [list, count] = await this.repository.findAndCount(queryData);
    return { list, count };
  }

  async findOne(id: string) {
    const one = await this.repository.findOne(id);
    if (!one) throw new UnprocessableEntityException('该数据不存在');
    return one;
  }

  async create(createData: CreateAdminData) {
    const data = new AdminEntity();
    Object.assign(data, createData);
    await this.repository.save(data);
  }

  async update(id: string, updateData: UpdateAdminData) {
    const one = await this.findOne(id);
    Object.assign(one, updateData);
    await this.repository.save(one);
  }

  async remove(id: string) {
    const one = await this.findOne(id);
    await this.repository.remove(one);
  }
}
