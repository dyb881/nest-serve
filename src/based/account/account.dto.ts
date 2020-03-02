import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { statusEnum, statusComment, typeEnum, typeComment } from './account.entity';
import { QueryPaginationDto, CommonDto, createValidator } from '../../common';

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
  type: {
    isIn: typeEnum,
    message: `请选择正确的${typeComment}`,
  },
  status: {
    isIn: statusEnum,
    message: `请选择正确的${statusComment}`,
  },
});

export class AccountDto extends CommonDto {
  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '昵称' })
  nickname: string;

  @ApiProperty({ enum: typeEnum, description: typeComment })
  type: string;

  @ApiProperty({ description: '注册IP' })
  reg_ip: string;

  @ApiProperty({ description: '登录IP' })
  login_ip: string;

  @ApiProperty({ description: '登录时间' })
  login_date: Date;

  @ApiProperty({ enum: statusEnum, description: statusComment })
  status: number;
}

export class AccountPaginationDto {
  @ApiProperty({ description: '列表', type: [AccountDto] })
  list: AccountDto[];

  @ApiProperty({ description: '总数' })
  total: number;
}

export class QueryAccountDto extends QueryPaginationDto {
  @IsOptional()
  @Validator('username')
  @ApiProperty({ description: '用户名', required: false })
  readonly username?: string;

  @IsOptional()
  @Validator('nickname')
  @ApiProperty({ description: '昵称', required: false })
  readonly nickname?: string;

  @IsOptional()
  @Validator('type')
  @ApiProperty({ enum: typeEnum, description: typeComment, required: false })
  type: string;

  @IsOptional()
  @Type(() => Number)
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

  @Validator('type')
  @ApiProperty({ enum: typeEnum, description: typeComment })
  type: string;

  @Validator('status')
  @ApiProperty({ description: statusComment, enum: statusEnum })
  readonly status: string;
}

export class UpdateAccountDto {
  @IsOptional()
  @Validator('password')
  @ApiProperty({ description: '密码', required: false })
  readonly password?: string;

  @Validator('nickname')
  @ApiProperty({ description: '昵称' })
  readonly nickname: string;

  @Validator('status')
  @ApiProperty({ description: statusComment, enum: statusEnum })
  readonly status: string;
}
