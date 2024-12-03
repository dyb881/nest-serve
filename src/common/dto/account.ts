import { DtoParam } from '../tools';

/**
 * 查询分页对象
 * 账号常用
 */
export class AccountQueryDto {
  @DtoParam('用户名', { required: false })
  username?: string;

  @DtoParam('手机号', { required: false })
  phone?: string;

  @DtoParam('昵称', { required: false })
  nickname?: string;
}

/**
 * 创建账号对象
 */
export class AccountCreateDto {
  @DtoParam('用户名', { matches: [/^[\d\w]{4,32}$/, '请输入正确的用户名，4-32位、字母、数字'] })
  username: string;

  @DtoParam('密码', { matches: [/^[\d\w]{4,32}$/, '请输入正确的密码，4-32位、字母、数字'] })
  password: string;

  @DtoParam('手机号', {
    required: false,
    matches: [
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
      '请输入正确格式的手机号',
    ],
  })
  phone?: string;

  @DtoParam('昵称', { matches: [/^[\d\w\u4e00-\u9fa5]{2,15}$/, '请输入正确的昵称，2-32位、中文、字母、数字'] })
  nickname: string;

  @DtoParam('头像', { required: false })
  avatar?: string;
}

/**
 * 更新账号对象
 */
export class AccountUpdateDto {
  @DtoParam('密码', { required: false, matches: [/^[\d\w]{4,32}$/, '请输入正确的密码，4-32位、字母、数字'] })
  password?: string;

  @DtoParam('手机号', {
    required: false,
    matches: [
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
      '请输入正确格式的手机号',
    ],
  })
  phone?: string;

  @DtoParam('昵称', { matches: [/^[\d\w\u4e00-\u9fa5]{2,15}$/, '请输入正确的昵称，2-32位、中文、字母、数字'] })
  nickname: string;

  @DtoParam('头像', { required: false })
  avatar?: string;
}

/**
 * 账号登录对象
 */
export class AccountLoginDto {
  @DtoParam('用户名', { matches: [/^[\d\w]{4,32}$/, '请输入正确的用户名，4-32位、字母、数字'] })
  username: string;

  @DtoParam('密码', { matches: [/^[\d\w]{4,32}$/, '请输入正确的密码，4-32位、字母、数字'] })
  password: string;
}
