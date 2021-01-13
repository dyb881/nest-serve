import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Information } from './information.entity';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';

@Module({
  imports: [TypeOrmModule.forFeature([Information])],
  controllers: [InformationController],
  providers: [InformationService],
})
export class InformationModule {}
