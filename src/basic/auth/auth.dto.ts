import { username, password, AccountDto } from '../account/account.dto';
import { ApiProperty } from '../../common';

export class authDto {
  @username
  @ApiProperty('用户名')
  username: string;

  @password
  @ApiProperty('密码')
  password: string;
}

/**
 * 登录信息
 */
export class LoginInfoDto extends AccountDto {
  @ApiProperty('token，放到请求头用于鉴权')
  access_token: string;
}
