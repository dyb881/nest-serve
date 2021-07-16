import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { LoggerModule } from '@app/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [() => load(readFileSync('config/production.yaml', 'utf8')) as Record<string, any>],
    }),
    LoggerModule.forRoot({
      isGlobal: true,
      useFactory: () => {
        return { filename: 'logs/account/account.log' };
      },
    }),
  ],
})
export class GlobalModule {}
