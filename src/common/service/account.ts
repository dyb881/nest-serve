import { BadRequestException, UnauthorizedException, Req } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { TransformInstanceToPlain } from 'class-transformer';
import { sha512 } from 'js-sha512';
import { IdsDto, AccountLoginDto } from '../dto';
import { insLike, insNull, toIp, format } from '../tools';
import { CommonService, TClass } from './common';

/**
 * crud 帐号服务
 */
export const AccountService = <
  Entity, // 实体
  CreateDto, // 创建
  UpdateDto, // 更新
  QueryDto, // 查询条件
  PaginationQueryDto, // 分页查询条件
>(
  _Entity: TClass<Entity>,
  _CreateDto: TClass<CreateDto>,
  _UpdateDto: TClass<UpdateDto>,
  _QueryDto: TClass<QueryDto>,
  _PaginationQueryDto: TClass<PaginationQueryDto>,
) => {
  class AccountService extends CommonService(_Entity, _CreateDto, _UpdateDto, _QueryDto, _PaginationQueryDto) {
    /**
     * 给账号固定参数加上模糊查询
     */
    getList(data: QueryDto, options?: FindManyOptions<Entity>) {
      insLike(data, ['username', 'phone', 'nickname']);
      return super.getList(data, options);
    }

    /**
     * 给账号固定参数加上模糊查询
     */
    getListAndCount(data: PaginationQueryDto, options?: FindManyOptions<Entity>) {
      insLike(data, ['username', 'phone', 'nickname']);
      return super.getListAndCount(data, options);
    }

    /**
     * 验证用户名是否存在 并创建用户
     */
    async create(data: CreateDto) {
      const { username } = data as any;
      const one = await this.repository.findOne({ where: { username } as any });
      if (one) throw new BadRequestException('用户名已存在');
      Object.assign(data, { reg_ip: this.req?.clientIp }); // 注入创建ip
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
     * 登录
     */
    @TransformInstanceToPlain()
    async login(
      { username, password }: AccountLoginDto,
      validatorAccount?: (_Entity: Entity) => void,
    ): Promise<Entity> {
      const one: any = await this.repository.findOne({ where: { username } as any });

      // 账号不存在或密码错误的情况下，提示登录失败
      if (!one || one.password !== sha512(password)) {
        throw new UnauthorizedException('登录失败');
      }

      // 验证账号
      validatorAccount?.(one);

      // 注入登录IP和登录时间
      const insLoginInfo: any = { login_ip: toIp(this.req.clientIp), login_date: format(new Date()) };
      this.repository.update(one.id, insLoginInfo);

      Object.assign(one, insLoginInfo);

      return one;
    }
  }

  return class extends AccountService {};
};
