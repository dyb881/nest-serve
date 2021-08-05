import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountPaginationService } from '@app/public-class';
import { AccountUserPaginationQueryDto, AccountUserCreateDto, AccountUserUpdateDto } from './user.dto';
import { AccountUser } from './user.entity';

@Injectable()
export class AccountUserService extends AccountPaginationService<
  AccountUserPaginationQueryDto,
  AccountUserCreateDto,
  AccountUserUpdateDto
>(AccountUser) {
  constructor(@InjectRepository(AccountUser) readonly accountUserRepository: Repository<AccountUser>) {
    super(accountUserRepository);
  }
}
