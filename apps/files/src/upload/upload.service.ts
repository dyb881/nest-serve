import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@app/http';
import { createOSS, createSTS, toOSSURL } from 'config/module';
import { FilesCreateDto } from '../files/files.dto';
import { UploadDto } from '../files/files.dto';
import { promises as fs } from 'fs';
import { extname } from 'path';
import dayjs from 'dayjs';
import nuid from 'nuid';
import OSS from 'ali-oss';

@Injectable()
export class UploadService {
  oss: OSS;
  sts: OSS.STS;

  constructor(private readonly httpService: HttpService) {
    this.oss = createOSS();
    this.sts = createSTS();
  }

  /**
   * 获取上传数据
   */
  async getUploadData(file: any, { type }: UploadDto) {
    const { originalname: name, size, path } = file;

    // 验证文件信息
    const fileConfig = await this.httpService.post('/config/validate', { name, size, path, type });

    // 合并数据
    const data = { name, url: path, type: fileConfig.type, store: 'server', size };

    return data;
  }

  /**
   * 推送到OSS
   */
  async putOSS(data: FilesCreateDto) {
    if (!this.oss) {
      await fs.unlink(data.url);
      throw new UnauthorizedException('未配置OSS');
    }

    try {
      const { url } = await this.oss.put(data.url, data.url);
      await fs.unlink(data.url);
      // 推送成功后才修改储存类型为OSS
      data.url = toOSSURL(url);
      data.store = 'oss';
    } catch (e) {}
  }

  async getSTS() {
    if (!this.sts) throw new UnauthorizedException('未配置OSS');

    const policy = {
      Statement: [{ Effect: 'Allow', Action: ['oss:PutObject'], Resource: ['acs:oss:*:*:bittyshow-files/*'] }],
      Version: '1',
    };

    const token = await this.sts.assumeRole('acs:ram::1334789584602596:role/oss', policy, 15 * 60);

    return {
      region: process.env.OSS_REGION,
      accessKeyId: token.credentials.AccessKeyId,
      accessKeySecret: token.credentials.AccessKeySecret,
      stsToken: token.credentials.SecurityToken,
      bucket: process.env.OSS_BUCKET,
    };
  }

  getPath(name: string) {
    // 生成文件路径
    const day = dayjs().format('YYYY-MM-DD');
    const filename = nuid.next() + extname(name);
    const path = `${process.env.UPLOADS_PATH}/${day}/${filename}`;

    return {
      path,
      url: toOSSURL(`https://${process.env.OSS_BUCKET}.${process.env.OSS_REGION}.aliyuncs.com/${path}`),
    };
  }
}
