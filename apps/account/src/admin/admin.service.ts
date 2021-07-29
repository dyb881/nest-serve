import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { insNull, toLike } from '@app/public-tool';
import { AccountPaginationService } from '@app/public-class';
import { AccountAdminPaginationQueryDto, AccountAdminCreateDto, AccountAdminUpdateDto } from './admin.dto';
import { AccountAdmin } from './admin.entity';

@Injectable()
export class AccountAdminService extends AccountPaginationService<
  AccountAdminPaginationQueryDto,
  AccountAdminCreateDto,
  AccountAdminUpdateDto
>(AccountAdmin) {
  constructor(@InjectRepository(AccountAdmin) readonly accountAdminRepository: Repository<AccountAdmin>) {
    super(accountAdminRepository);
  }

  pagination(data: AccountAdminPaginationQueryDto) {
    toLike(data, ['username', 'phone', 'nickname']);
    return super.pagination(data);
  }

  update(id: string, data: AccountAdminUpdateDto) {
    insNull(data, ['phone', 'avatar']);
    return super.update(id, data);
  }
}
