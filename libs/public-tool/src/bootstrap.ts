import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@app/public-module';
import { mw } from 'request-ip';

type BootstrapOptions = NestApplicationOptions & {
  // 在服务启动之前执行
  before?: (app: INestApplication) => void;
  // 使用微服务
  microservice?: boolean;
};

/**
 * 服务启动引导程序
 */
export async function bootstrap(module: any, bootstrapOptions?: BootstrapOptions) {
  const { before, microservice, ...options } = bootstrapOptions || {};

  const app = await NestFactory.create(module, options);

  before?.(app);

  // 获取客户端真实IP
  app.use(mw());

  // 获取配置服务
  const configService = app.get<ConfigService>(ConfigService);

  // 服务配置
  const serve = configService.get('serve');

  // 注入日志
  const loggerService = app.get(LoggerService);
  app.useLogger(loggerService);

  // 接口请求前缀
  app.setGlobalPrefix(serve.prefix);

  // swagger 接口文档
  const swagger = configService.get('swagger');
  const documentBuilder = new DocumentBuilder()
    .setTitle(swagger.title)
    .setDescription(swagger.description)
    .addBearerAuth()
    .addServer(serve.prefix)
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder, { ignoreGlobalPrefix: true });
  SwaggerModule.setup(swagger.path, app, document);

  // 使用微服务
  const microserviceService = configService.get('microserviceService');
  if (microservice && microserviceService) {
    // 连接微服务
    app.connectMicroservice<MicroserviceOptions>(microserviceService, { inheritAppConfig: true });

    // 启动所有微服务
    await app.startAllMicroservices();
  }

  // 启动HTTP服务
  await app.listen(serve.port);

  // 捕获进程错误
  process.on('uncaughtException', function (err) {
    loggerService.error(err, '进程异常');
  });

  loggerService.log(`http://localhost:${serve.port}/${swagger.path}`, swagger.title);
}
