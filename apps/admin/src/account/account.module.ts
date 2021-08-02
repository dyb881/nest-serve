import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountAdminController } from './admin.controller';

@Module({
  imports: [ClientsModule.register([{ name: 'MATH_SERVICE', transport: Transport.TCP }])],
  controllers: [AccountAdminController],
})
export class AccountModule {}
