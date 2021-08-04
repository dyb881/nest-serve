import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@app/public-decorator';
import { CrudController } from '@app/public-class';
import { AdminRoleService } from './admin-role.service';
import { AdminRoleCreateDto, AdminRoleUpdateDto } from './admin-role.dto';
import { AdminRole } from './admin-role.entity';

@ApiTags('管理员角色')
@Controller('admin/role')
export class AdminRoleController extends CrudController(AdminRole, AdminRoleCreateDto, AdminRoleUpdateDto) {
  constructor(private readonly adminRoleService: AdminRoleService) {
    super(adminRoleService);
  }

  @MessagePattern(`${AdminRole.name}.get.config`)
  @Get('config')
  @ApiOperation(`获取权限配置：${AdminRole.name}.get.config`)
  getConfig() {
    return this.adminRoleService.getPermissionConfig();
  }
}
