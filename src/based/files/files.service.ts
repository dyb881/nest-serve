import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Files, fileTypeSuffix } from './files.entity';
import { QueryFilesDto, CreateFilesDto } from './files.dto';
import { pagination } from '../../common';
import { join, extname } from 'path';
import { removeSync } from 'fs-extra';
import { pick } from 'lodash';

@Injectable()
export class FilesService {
  constructor(@InjectRepository(Files) private readonly filesRepository: Repository<Files>) {}

  async findAndCount(data: QueryFilesDto) {
    const [list, total] = await pagination(this.filesRepository, data);
    return { list, total };
  }

  async create(data: CreateFilesDto & { readonly username: string }) {
    let type = '';

    const suffix = extname(data.name).slice(1);
    Object.keys(fileTypeSuffix).forEach(i => {
      if (fileTypeSuffix[i].some(i => i === suffix)) type = i;
    });

    if (!type) throw new BadRequestException('禁止上传该类型文件');

    Object.assign(data, { type });
    await this.filesRepository.save(data);
    return pick(data, ['url']);
  }

  async remove(id: string) {
    // 删除文件
    const one = await this.filesRepository.findOne(id);
    one?.url && removeSync(join(__dirname, '../../../public', one.url));
    await this.filesRepository.delete(id);
  }
}
