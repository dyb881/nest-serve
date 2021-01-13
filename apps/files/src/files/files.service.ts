import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService, insLike } from '@app/service-tool';
import { createOSS, toOSSURL } from 'config/module';
import { FilesQueryDto, FilesCreateDto, FilesUpdateDto } from './files.dto';
import { Files } from './files.entity';
import { promises as fs } from 'fs';
import OSS from 'ali-oss';

@Injectable()
export class FilesService extends CommonService<Files, any, FilesCreateDto, FilesUpdateDto> {
  oss: OSS;

  constructor(@InjectRepository(Files) readonly filesRepository: Repository<Files>) {
    super(filesRepository);
    this.oss = createOSS();
  }

  pagination(data: FilesQueryDto) {
    insLike(data, ['name']);
    return super.pagination(data);
  }

  async delete(ids: string[]) {
    const list = await super.findAll({ where: { id: ids } });
    await super.delete(ids);
    list.forEach(({ url, store }) => {
      switch (store) {
        case 'server':
          this.deleteFile(url);
          break;
        case 'oss':
          this.deleteOSS(url);
          break;
      }
    });
  }

  async deleteFile(path: string) {
    try {
      await fs.unlink(path);
    } catch {}
  }

  async deleteOSS(url: string) {
    const { pathname } = new URL(url);
    await this.oss?.delete(pathname);
  }

  async toOSS(ids: string[]) {
    if (!this.oss) throw new UnauthorizedException('未配置OSS');

    const list = await this.findAll({ where: { id: ids } });
    for await (let i of list) {
      if (i.store === 'server') {
        try {
          let { url } = await this.oss.put(i.url, i.url);
          this.deleteFile(i.url);
          i.url = toOSSURL(url);
          i.store = 'oss';
        } catch (e) {}
      }
    }
    await this.filesRepository.save(list);
  }
}
