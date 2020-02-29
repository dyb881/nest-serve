import { ApiProperty } from '@nestjs/swagger';
import { createValidator } from '../../common';
import { IsOptional } from 'class-validator';
import { statusEnum, statusComment } from './account.entity';

/**
 * 自定义验证器
 */
export const Validator = createValidator({
  username: {
    matches: /^[\d\w-_]{4,32}$/,
    message: '请输入正确的用户名，4-32位、字母、数字、下划线、减号',
  },
  password: {
    matches: /^[\d\w-_]{4,32}$/,
    message: '请输入正确的密码，4-32位、字母、数字、下划线、减号',
  },
  nickname: {
    matches: /^[\d\w\u4e00-\u9fa5-_]{2,15}$/,
    message: '请输入正确的昵称，2-32位、中文、字母、数字，下划线、减号',
  },
  status: {
    isIn: statusEnum,
    message: `请选择正确的${statusComment}`,
  },
});

export class QueryAccountDto {
  @IsOptional()
  @Validator('username')
  @ApiProperty({ description: '用户名', required: false })
  readonly username?: string;

  @IsOptional()
  @Validator('nickname')
  @ApiProperty({ description: '昵称', required: false })
  readonly nickname?: string;

  @IsOptional()
  @Validator('status')
  @ApiProperty({ description: statusComment, enum: statusEnum, required: false })
  readonly status?: number;
}

export class CreateAccountDto {
  @Validator('username')
  @ApiProperty({ description: '用户名' })
  readonly username: string;

  @Validator('password')
  @ApiProperty({ description: '密码' })
  readonly password: string;

  @Validator('nickname')
  @ApiProperty({ description: '昵称' })
  readonly nickname: string;

  @Validator('status')
  @ApiProperty({ description: statusComment, enum: statusEnum })
  readonly status: string;
}

export class UpdateAccountDto extends CreateAccountDto {}
