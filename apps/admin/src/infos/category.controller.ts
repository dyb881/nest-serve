import { Inject, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { JwtPermissions } from '@app/public-module';
import { ManyClientController } from '@app/public-class';
import { Category } from 'apps/infos/src/category/category.entity';
import { CategoryCreateDto, CategoryUpdateDto, CategoryQueryDto } from 'apps/infos/src/category/category.dto';

const PERMISSIONS = 'infos.category';

@JwtPermissions()
@ApiTags('信息分类')
@Controller('infos/category')
export class CategoryController extends ManyClientController(
  PERMISSIONS,
  Category,
  CategoryCreateDto,
  CategoryUpdateDto,
  CategoryQueryDto
) {
  constructor(@Inject('INFOS_SERVICE') readonly client: ClientProxy) {
    super(client);
  }
}
