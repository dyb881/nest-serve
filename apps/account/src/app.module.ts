import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { GlobalModule } from './global.module';

@Module({
  imports: [GlobalModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AppModule {}
