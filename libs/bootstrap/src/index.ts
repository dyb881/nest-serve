import { NestFactory } from '@nestjs/core';
import { ValidationPipe, NestApplicationOptions } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor, HttpExceptionFilter } from '@app/middleware';
import { Logger } from '@app/logger';

/**
 * 公用服务引导启动
 */
const bootstrap = async (module: any, options?: NestApplicationOptions) => {
  const app = await NestFactory.create(module, options);

  // 日志
  const logger = new Logger(process.env.LOG_PATH);
  app.useLogger(logger);

  // 接口请求前缀
  app.setGlobalPrefix(process.env.SERVE_PREFIX);

  // 全局使用验证管道，并统一报错处理
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 响应参数统一格式
  app.useGlobalInterceptors(new TransformInterceptor(logger));

  // 报错过滤器
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  // swagger 接口文档
  const documentBuilder = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .addBearerAuth()
    .addServer(process.env.SERVE_PREFIX)
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder, { ignoreGlobalPrefix: true });
  SwaggerModule.setup(process.env.SWAGGER_PATH, app, document);

  await app.listen(process.env.SERVE_PORT);

  logger.log(`http://localhost:${process.env.SERVE_PORT}/${process.env.SWAGGER_PATH}`, process.env.SWAGGER_TITLE);
};

export default bootstrap;
