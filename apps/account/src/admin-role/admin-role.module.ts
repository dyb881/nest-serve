import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRole } from './admin-role.entity';
import { AdminRoleController } from './admin-role.controller';
import { AdminRoleService } from './admin-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRole])],
  controllers: [AdminRoleController],
  providers: [AdminRoleService],
})
export class AdminRoleModule {}
