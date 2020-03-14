import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UploadFile } from './upload-file.entity';
import { UploadQueryDto, CreateFileCreateDto } from './upload-file.dto';
import { CommonService, insLike, toUrl } from '../../common';
import { removeSync } from 'fs-extra';
import { join } from 'path';

@Injectable()
export class UploadFileService extends CommonService<UploadFile> {
  constructor(@InjectRepository(UploadFile) readonly uploadFileRepository: Repository<UploadFile>) {
    super(uploadFileRepository);
  }

  pagination(data: UploadQueryDto) {
    insLike(data, ['name', 'username']);
    return super.pagination(data);
  }

  async create(data: CreateFileCreateDto & { type: string; username: string }) {
    const uploadFile = await this.uploadFileRepository.save(data);
    const { id, url } = uploadFile;
    return { id, url: toUrl(url) };
  }

  async delete(ids: string[]) {
    const list = await this.uploadFileRepository.find({ where: In(ids) });
    list.forEach(({ url }) => this.deleteFile(url));
    await super.delete(ids);
  }

  /**
   * 删除文件
   */
  deleteFile(url: string) {
    removeSync(join(__dirname, '../../../public', url));
  }
}
