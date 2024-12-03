import { NestFactory } from '@nestjs/core';
import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { mw } from 'request-ip';
import { initialize } from './common/initialize';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // 获取客户端真实IP
  app.use(mw());

  // 获取配置服务
  const configService = await app.resolve<ConfigService>(ConfigService);

  // 插入日志
  const loggerService = await app.resolve<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(loggerService);

  const serve = configService.get('serve'); // 服务配置
  const swagger = configService.get('swagger'); // swagger 配置

  // 接口文档
  const documentBuilder = new DocumentBuilder()
    .setTitle(swagger.title)
    .setDescription(swagger.description)
    .addBearerAuth()
    .addServer(serve.prefix)
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder, { ignoreGlobalPrefix: true });
  SwaggerModule.setup(swagger.path, app, document);

  app.setGlobalPrefix(serve.prefix); // 接口请求前缀
  await app.listen(process.env.PORT ?? serve.port); // 启动服务

  // 捕获进程错误
  process.on('uncaughtException', function (err) {
    loggerService.error(err, '进程异常');
  });

  // 输出链接
  loggerService.log(`http://localhost:${serve.port}/${swagger.path}`, '接口文档');
  loggerService.log(`http://localhost:${serve.port}/${serve.prefix}`, '接口地址');

  initialize(app);
}

bootstrap();
