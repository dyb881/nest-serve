import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';

const imports = [CategoryModule, ArticleModule];

@Module({
  imports: [
    ...imports,

    // 路由前缀定义
    RouterModule.register([{ path: 'infos', children: imports }]),
  ],
})
export class InfosModule {}
