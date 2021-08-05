import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { ArticleController } from './article.controller';

@Module({
  controllers: [CategoryController, ArticleController],
})
export class InfosModule {}
