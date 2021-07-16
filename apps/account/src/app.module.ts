import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { GlobalModule } from '@app/public-module';

@Module({
  imports: [GlobalModule.forRoot({ yamlFilePath: ['apps/account.yaml'] })],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AppModule {}
