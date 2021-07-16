import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@app/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  const loggerService = app.get(LoggerService);
  console.log(loggerService);

  const configService = app.get(ConfigService);
  const port = configService.get('db[0]');
  console.dir(port);

  await app.listen(3000);
}

bootstrap();
