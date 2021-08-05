import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransformClassToPlain } from 'class-transformer';
import { insNull, insLike } from '@app/public-tool';
import { AccountPaginationQueryDto, AccountCreateDto, AccountUpdateDto, AccountLoginDto } from '../dto';
import { AccountEntity } from '../entity';
import { PaginationService } from './pagination';
import { sha512 } from 'js-sha512';

/**
 * 分页服务
 * 账号类型拓展
 */
export function AccountPaginationService<
  PaginationQueryDto extends AccountPaginationQueryDto = any,
  CreateDto extends AccountCreateDto = any,
  UpdateDto extends AccountUpdateDto = any,
  Entity extends AccountEntity = any
>(_Entity: Entity) {
  class AccountPaginationService extends PaginationService<PaginationQueryDto, CreateDto, UpdateDto, Entity>(_Entity) {
    constructor(readonly repository: Repository<Entity>) {
      super(repository);
    }

    /**
     * 给账号固定参数加上模糊查询
     */
    pagination(data: PaginationQueryDto) {
      insLike(data, ['username', 'phone', 'nickname']);
      return super.pagination(data);
    }

    /**
     * 验证用户名是否存在 并创建用户
     */
    async create(data: CreateDto) {
      await this.isUsernameExist(data.username);
      await super.create(data);
    }

    /**
     * 给账号固定参数插入null，避免参数为空时修改失败
     */
    update(id: string, data: UpdateDto) {
      insNull(data, ['phone', 'avatar']);
      return super.update(id, data);
    }

    /**
     * 验证用户名是否存在
     */
    async isUsernameExist(username: string) {
      const one = await this.repository.findOne({ username });
      if (one) throw new BadRequestException('用户名已存在');
    }

    /**
     * 登录
     * @param {AccountLoginDto} 登录时所需的账号密码
     * @param validatorAccount 自定义验证账号函数假如不通过，抛出异常提示即可
     */
    @TransformClassToPlain()
    async login({ username, password }: AccountLoginDto, validatorAccount?: (_Entity: Entity) => void) {
      const one = await this.repository.findOne({ username });
      // 账号不存在或密码错误的情况下，提示登录失败
      if (!one || one.password !== sha512(password)) {
        throw new UnauthorizedException('登录失败');
      }
      // 验证账号
      validatorAccount?.(one);
      return one;
    }
  }

  return class extends AccountPaginationService {};
}
