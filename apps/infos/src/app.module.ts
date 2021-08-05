import { Module } from '@nestjs/common';
import { GlobalModule } from '@app/public-module';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    GlobalModule.forRoot({ yamlFilePath: ['apps/infos.yaml'], typeorm: true }),
    CategoryModule, // 信息分类
    ArticleModule, // 文章管理
  ],
})
export class AppModule {}
