import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InfoQueryDto, InfoCreateDto, InfoUpdateDto } from './info.dto';
import { Info } from './info.entity';
import { CommonService, insLike } from '../../common';

@Injectable()
export class InfoService extends CommonService<Info, any, InfoCreateDto & { create_username: string }, InfoUpdateDto & { update_username: string }> {
  constructor(@InjectRepository(Info) readonly infoRepository: Repository<Info>) {
    super(infoRepository);
  }

  pagination(data: InfoQueryDto) {
    insLike(data, ['title', 'summary', 'content']);
    return super.pagination(data, { order: { priority: 'DESC' } });
  }
}
