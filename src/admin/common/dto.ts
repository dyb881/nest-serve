import { ApiModelProperty } from '@nestjs/swagger';

export class QueryAdminDto {
  @ApiModelProperty({ description: '用户名', required: false })
  readonly username?: string;

  @ApiModelProperty({ description: '昵称', required: false })
  readonly nickname?: string;

  @ApiModelProperty({
    description: '状态，0未审核，1已审核，2冻结',
    required: false,
  })
  readonly status?: number;
}

export class CreateAdminDto {
  @ApiModelProperty({ description: '用户名' })
  readonly username: string;

  @ApiModelProperty({ description: '密码' })
  readonly password: string;

  @ApiModelProperty({ description: '确认密码' })
  readonly confirmPassword: string;

  @ApiModelProperty({ description: '昵称' })
  readonly nickname: string;

  @ApiModelProperty({ description: '状态，0未审核，1已审核，2冻结' })
  readonly status: number;
}

export class UpdateAdminDto {
  @ApiModelProperty({ description: '用户名' })
  readonly username: string;

  @ApiModelProperty({ description: '密码', required: false })
  readonly password?: string;

  @ApiModelProperty({ description: '新密码', required: false })
  readonly newPassword?: string;

  @ApiModelProperty({ description: '确认密码' })
  readonly confirmPassword: string;

  @ApiModelProperty({ description: '昵称' })
  readonly nickname: string;

  @ApiModelProperty({ description: '状态，0未审核，1已审核，2冻结' })
  readonly status: number;
}

export class AdminDto {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  create_date: string;

  @ApiModelProperty()
  update_date: string;

  @ApiModelProperty()
  username: string;

  @ApiModelProperty()
  nickname: string;

  @ApiModelProperty()
  reg_ip: string;

  @ApiModelProperty()
  login_ip: string;

  @ApiModelProperty()
  login_date: string;

  @ApiModelProperty()
  status: number;
}
