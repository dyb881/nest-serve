import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [MenuModule, InfoModule]
})
export class AdminModule {}
