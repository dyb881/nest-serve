import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService, insLike, insNull } from '@app/service-tool';
import { InformationQueryDto, InformationCreateDto, InformationUpdateDto } from './information.dto';
import { Information } from './information.entity';

@Injectable()
export class InformationService extends CommonService<Information, any, InformationCreateDto> {
  constructor(@InjectRepository(Information) readonly informationRepository: Repository<Information>) {
    super(informationRepository);
  }

  pagination(data: InformationQueryDto) {
    insLike(data, ['title', 'summary', 'content']);
    return super.pagination(data, { order: { priority: 'DESC' } });
  }

  async update(id: string, data: InformationUpdateDto) {
    insNull(data, ['icon', 'pictureGroup', 'summary', 'content', 'categoryId']);
    await super.update(id, data);
  }
}
