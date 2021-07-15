import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [() => load(readFileSync('config/production.yaml', 'utf8')) as Record<string, any>],
    }),
    WinstonModule,
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
