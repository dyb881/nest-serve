import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuQueryDto, MenuCreateDto, MenuUpdateDto } from './menu.dto';
import { Menu } from './menu.entity';
import { CommonService, insLike } from '../../common';

@Injectable()
export class MenuService extends CommonService<Menu, any, MenuCreateDto & { create_username: string }, MenuUpdateDto & { update_username: string }> {
  constructor(@InjectRepository(Menu) readonly menuRepository: Repository<Menu>) {
    super(menuRepository);
  }

  pagination(data: MenuQueryDto) {
    insLike(data, ['title', 'content']);
    return super.pagination(data);
  }
}
