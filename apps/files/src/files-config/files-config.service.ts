import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { FileConfigDto, FilesConfigDto, FileInfoDto } from './files-config.dto';
import { filesConfig } from '../files/files.entity';
import { promises as fs } from 'fs';
import { extname } from 'path';
import filesize from 'filesize';
import { FilesService } from '../files/files.service';

@Injectable()
export class FilesConfigService {
  constructor(private readonly filesService: FilesService) {}

  async getConfig() {
    const data = await fs.readFile('config/files.config.json');
    const filesConfig = JSON.parse(data.toString());
    return { filesConfig };
  }

  async saveConfig({ filesConfig }: FilesConfigDto) {
    await fs.writeFile('config/files.config.json', JSON.stringify(filesConfig, null, 2));
  }

  getFileConfig(filename: string): FileConfigDto {
    const suffix = extname(filename).slice(1);
    const fileConfig = filesConfig.find((i) => i.suffixs.includes(suffix));
    return fileConfig;
  }

  validate({ name, size, path, type }: FileInfoDto) {
    // 获取文件类型配置
    const fileConfig = this.getFileConfig(name);
    let error;

    if (!fileConfig || (type && fileConfig.type !== type)) {
      // 类型判断
      error = '禁止上传该类型文件';
    } else if (size > fileConfig.maxSize) {
      // 文件大小判断
      error = `${fileConfig.name}文件大小不能大于 ${filesize(fileConfig.maxSize)}`;
    }

    // 验证失败则删除文件，并抛出异常
    if (error) {
      path && this.filesService.deleteFile(path);
      throw new UnsupportedMediaTypeException(error);
    }

    return fileConfig;
  }
}
