import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { CrudController } from '@app/public-class';
import { AdminRoleService } from './admin-role.service';
import { AdminRoleCreateDto, AdminRoleUpdateDto } from './admin-role.dto';
import { AdminRole } from './admin-role.entity';

@ApiTags('管理员角色')
@Controller('admin-role')
export class AdminRoleController extends CrudController(AdminRoleCreateDto, AdminRoleUpdateDto, AdminRole) {
  constructor(private readonly adminRoleService: AdminRoleService) {
    super(adminRoleService);
  }

  @Get('permission-config')
  @ApiOperation('获取权限配置')
  getDefaultConfig() {
    return this.adminRoleService.getPermissionConfig();
  }
}
