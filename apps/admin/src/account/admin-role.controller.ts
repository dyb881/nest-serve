import { Inject, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation } from '@app/public-decorator';
import { JwtPermissions, Permissions } from '@app/public-module';
import { ManyClientController } from '@app/public-class';
import { AdminRole } from 'apps/account/src/admin-role/admin-role.entity';
import { AdminRoleCreateDto, AdminRoleUpdateDto, AdminRoleQueryDto } from 'apps/account/src/admin-role/admin-role.dto';

const PERMISSIONS = 'account.adminRole';

@JwtPermissions()
@ApiTags('管理员角色')
@Controller('account/admin/role')
export class AdminRoleController extends ManyClientController(
  PERMISSIONS,
  AdminRole,
  AdminRoleCreateDto,
  AdminRoleUpdateDto,
  AdminRoleQueryDto
) {
  constructor(@Inject('ACCOUNT_SERVICE') readonly client: ClientProxy) {
    super(client);
  }

  @Permissions(`${PERMISSIONS}.query`)
  @Get('config')
  @ApiOperation('获取权限配置')
  getConfig() {
    return this.client.send(`${AdminRole.name}.get.config`, {});
  }
}
