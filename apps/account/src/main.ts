import { NestFactory } from '@nestjs/core';
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AccountModule } from './account.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule, {});

  // 日志注入
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const configService = app.get(ConfigService);
  const port = configService.get('db[0]');
  console.dir(port);

  await app.listen(3000);
}

bootstrap();
