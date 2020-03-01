import { ApiProperty } from '@nestjs/swagger';
import { Validator } from '../account/account.dto';

export class authDto {
  @Validator('username')
  @ApiProperty({ description: '用户名' })
  readonly username: string;

  @Validator('password')
  @ApiProperty({ description: '密码' })
  readonly password: string;
}

export class tokenDto {
  @ApiProperty({ description: 'token，放到请求头用于鉴权' })
  readonly access_token: string;
}
