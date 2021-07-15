import { Module, Global } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

@Global()
@Module({
  providers: [WinstonModule],
  exports: [],
})
export class LoggerModule {}
