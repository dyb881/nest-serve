import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountAdmin } from './admin.entity';
import { AccountAdminController } from './admin.controller';
import { AccountAdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountAdmin])],
  controllers: [AccountAdminController],
  providers: [AccountAdminService],
  exports: [AccountAdminService],
})
export class AccountAdminModule {}
