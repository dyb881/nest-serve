import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor, HttpExceptionFilter } from './common';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 接口请求前缀
  app.setGlobalPrefix('api');

  // 报错过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 安全防御中间件
  app.use(helmet());

  // swagger 接口文档
  const options = new DocumentBuilder()
    .setTitle('管理后台接口文档')
    .setDescription('code:状态码，message:提示信息，data:返回值')
    .setBasePath('api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  // 启动服务
  await app.listen(80);
}
bootstrap();
