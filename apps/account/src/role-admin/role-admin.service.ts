import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleAdminCreateDto, RoleAdminUpdateDto } from './role-admin.dto';
import { RoleAdmin } from './role-admin.entity';
import { CommonService } from '@app/service-tool';

@Injectable()
export class RoleAdminService extends CommonService<RoleAdmin, any, RoleAdminCreateDto, RoleAdminUpdateDto> {
  constructor(@InjectRepository(RoleAdmin) readonly categoryRepository: Repository<RoleAdmin>) {
    super(categoryRepository);
  }
}
