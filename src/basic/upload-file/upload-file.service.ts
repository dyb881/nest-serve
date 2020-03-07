import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UploadFile } from './upload-file.entity';
import { UploadQueryDto, CreateFileCreateDto } from './upload-file.dto';
import { pagination } from '../../common';
import { removeSync } from 'fs-extra';
import { join } from 'path';
import { pick } from 'lodash';

@Injectable()
export class UploadFileService {
  constructor(@InjectRepository(UploadFile) private readonly uploadFileRepository: Repository<UploadFile>) {}

  async pagination({ current, pageSize, ...data }: UploadQueryDto) {
    const [list, total] = await pagination(this.uploadFileRepository, { current, pageSize }, data);
    return { list, total };
  }

  async create(data: CreateFileCreateDto & { readonly username: string }) {
    await this.uploadFileRepository.save(data);
    return pick(data, ['url']);
  }

  async delete(ids: string[]) {
    const list = await this.uploadFileRepository.find({ where: In(ids) });
    list.forEach(({ url }) => this.deleteFile(url));
    await this.uploadFileRepository.delete(ids);
  }

  /**
   * 删除文件
   */
  deleteFile(url: string) {
    removeSync(join(__dirname, '../../../public', url));
  }
}
