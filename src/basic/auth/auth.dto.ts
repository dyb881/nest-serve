import { username, password } from '../account/account.dto';
import { Account } from '../account/account.entity';
import { ApiProperty } from '../../common';

export class AuthDto {
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
export class LoginInfoDto extends Account {
  @ApiProperty('token，放到请求头用于鉴权')
  access_token: string;
}
