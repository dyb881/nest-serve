import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor, HttpExceptionFilter, log } from './common';
import { AppModule } from './app.module';
import { address } from 'ip';

const ip = address();
const port = 80;
const prefix = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 接口请求前缀
  app.setGlobalPrefix(prefix);

  // 全局使用验证管道，并统一报错处理
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: ([error]) => {
        throw new BadRequestException(Object.values(error.constraints)[0]);
      },
    })
  );

  // 响应参数统一格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 报错过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger 接口文档
  const options = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('code:状态码，message:提示信息，data:返回值')
    .setBasePath(prefix)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  // 启动服务
  await app.listen(port);

  log('log')('启动服务', `http://${ip}`, `http://${ip}/${prefix}`, `http://${ip}/swagger`);
}

bootstrap();
