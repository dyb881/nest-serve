import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor, HttpExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局接口请求前缀
  app.setGlobalPrefix('api');
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局报错过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 启动服务
  await app.listen(80);
}
bootstrap();
