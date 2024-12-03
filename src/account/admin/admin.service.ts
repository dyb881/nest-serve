import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService, AccountLoginDto } from '../../common';
import { Admin, ACCOUNT_ADMIN_STATUS } from './admin.entity';
import { AdminCreateDto, AdminUpdateDto, AdminQueryDto, AdminPaginationQueryDto } from './admin.dto';

@Injectable()
export class AdminService extends AccountService(
  Admin,
  AdminCreateDto,
  AdminUpdateDto,
  AdminQueryDto,
  AdminPaginationQueryDto,
) {
  /**
   * 登录
   */
  login(data: AccountLoginDto) {
    return super.login(data, (one: Admin) => {
      // 验证帐号状态
      if (one.status !== 1) throw new UnauthorizedException(`账号${ACCOUNT_ADMIN_STATUS[one.status]}`);
    });
  }
}
