import { Module } from '@nestjs/common';
import { PublicDecoratorService } from './public-decorator.service';

@Module({
  providers: [PublicDecoratorService],
  exports: [PublicDecoratorService],
})
export class PublicDecoratorModule {}
