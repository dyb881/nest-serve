import { Module } from '@nestjs/common';
import { cacheModule, httpModule } from 'config/module';
import { CategoryController } from './category.controller';
import { InformationController } from './information.controller';

@Module({
  imports: [cacheModule(), httpModule({ asyncHost: () => process.env.GATEWAY_HOST_INFOS })],
  controllers: [CategoryController, InformationController],
})
export class InfosModule {}
