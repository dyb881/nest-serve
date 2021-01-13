import { Module } from '@nestjs/common';
import { configModule, typeOrmModule } from 'config/module';
import { CategoryModule } from './category/category.module';
import { InformationModule } from './information/information.module';

@Module({
  imports: [configModule('infos'), typeOrmModule(), CategoryModule, InformationModule],
})
export class AppModule {}
