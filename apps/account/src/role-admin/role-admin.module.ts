import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleAdmin } from './role-admin.entity';
import { RoleAdminController } from './role-admin.controller';
import { RoleAdminService } from './role-admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleAdmin])],
  controllers: [RoleAdminController],
  providers: [RoleAdminService],
})
export class RoleAdminModule {}
