import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { serveConfig, logger, TransformInterceptor, HttpExceptionFilter } from './common/global';
import helmet from 'helmet';
import { AppModule } from './app.module';

const { port, prefix, url, apiUrl, swaggerPath, swaggerUrl } = serveConfig;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger, cors: true });

  // 设置与安全相关的 HTTP 头
  app.use(helmet());

  // 接口请求前缀
  app.setGlobalPrefix(prefix);

  // 全局使用验证管道，并统一报错处理
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 响应参数统一格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 报错过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger 接口文档
  const options = new DocumentBuilder()
    .setTitle(`接口文档`)
    .setDescription('code:状态码，message:提示信息，data:返回值')
    .addBearerAuth()
    .addServer(prefix)
    .build();
  const document = SwaggerModule.createDocument(app, options, { ignoreGlobalPrefix: true });
  SwaggerModule.setup(swaggerPath, app, document);

  await app.listen(port);

  logger.log(url, '服务地址');
  logger.log(apiUrl, 'API地址');
  logger.log(swaggerUrl, '接口文档');
}

bootstrap();
