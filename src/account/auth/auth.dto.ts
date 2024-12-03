import { DtoParam } from '../../common';
import { Admin } from '../admin/admin.entity';
import { User } from '../user/user.entity';

/**
 * 管理员账号信息
 */
export class AdminDto extends Admin {
  @DtoParam('角色信息')
  role: any;
}

/**
 * 管理员授权信息
 */
export class AdminAuthDto extends AdminDto {
  @DtoParam('headers.Authorization="Bearer ${access_token}" 用于鉴权')
  access_token: string;
}

/**
 * 管理员账号信息
 */
export class UserDto extends User {
  @DtoParam('角色信息')
  role: any;
}

/**
 * 管理员授权信息
 */
export class UserAuthDto extends UserDto {
  @DtoParam('headers.Authorization="Bearer ${access_token}" 用于鉴权')
  access_token: string;
}
