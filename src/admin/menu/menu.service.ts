import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuQueryDto, MenuCreateDto, MenuUpdateDto } from './menu.dto';
import { Menu } from './menu.entity';
import { CommonService, insLike, insNull } from '../../common';

@Injectable()
export class MenuService extends CommonService<Menu, any, MenuCreateDto & { create_username: string }> {
  constructor(@InjectRepository(Menu) readonly menuRepository: Repository<Menu>) {
    super(menuRepository);
  }

  findAllMenu(data: MenuQueryDto) {
    insLike(data, ['title', 'content']);
    return super.findAll({ where: data, order: { priority: 'DESC' } });
  }

  async update(id: string, data: MenuUpdateDto & { update_username: string }) {
    insNull(data, ['pid', 'icon', 'content']);
    await super.update(id, data);
  }
}
