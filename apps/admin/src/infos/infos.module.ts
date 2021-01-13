import { Module } from '@nestjs/common';
import { httpModule } from 'config/module';
import { CategoryController } from './category.controller';
import { InformationController } from './information.controller';

@Module({
  imports: [httpModule({ asyncHost: () => process.env.GATEWAY_HOST_INFOS })],
  controllers: [CategoryController, InformationController],
})
export class InfosModule {}
