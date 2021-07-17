import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@app/public-module';

import requestIp from 'request-ip';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  // 获取客户端真实IP
  app.use(requestIp.mw());

  // 获取配置
  const configService = app.get(ConfigService);
  const port = configService.get('serve.port');

  await app.listen(port);

  // 注入日志
  const loggerService = app.get(LoggerService);
  app.useLogger(loggerService);
}

bootstrap();
