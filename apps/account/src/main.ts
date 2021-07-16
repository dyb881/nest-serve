import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@app/public-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  // 获取配置
  const configService = app.get(ConfigService);
  const port = configService.get('serve');

  // 注入日志
  const loggerService = app.get(LoggerService);
  app.useLogger(loggerService);

  await app.listen(port);
}

bootstrap();
