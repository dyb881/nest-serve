import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuQueryDto, MenuCreateDto, MenuUpdateDto } from './menu.dto';
import { Menu } from './menu.entity';
import { CommonService } from '../../common';

@Injectable()
export class MenuService extends CommonService<
  Menu,
  MenuQueryDto,
  MenuCreateDto & { create_username: string },
  MenuUpdateDto & { update_username: string }
> {
  constructor(@InjectRepository(Menu) readonly menuRepository: Repository<Menu>) {
    super(menuRepository);
  }
}
