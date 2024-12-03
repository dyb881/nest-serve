import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileLimit } from './upload.dto';
import { promises as fs } from 'fs';
import { findKey } from 'lodash';
import { extname } from 'path';
import dayjs from 'dayjs';

import { nuid } from 'nuid';
import OSS from 'ali-oss';

type verifyOptions = {
  originalname?: string; // 文件原名
  name?: string; // 文件名
  size: number; // 文件大小
  path?: string; // 文件路径
};

type aliConfig = {
  accessKeyId?: string;
  accessKeySecret?: string;
  oss: {
    bucket: string;
    region: string;
    internal: boolean;
    secure: boolean;
    arn: string;
  };
};

/**
 * 文件上传
 */
@Injectable()
export class UploadService {
  uploadPath: string; // 文件储存路径
  fileLimit: FileLimit; // 文件限制配置
  ali: aliConfig; // 阿里云相关配置

  constructor(private readonly configService: ConfigService) {
    this.uploadPath = configService.get<string>('uploadPath');
    this.fileLimit = this.configService.get<FileLimit>('fileLimit');
    this.ali = configService.get<aliConfig>('ali');
    this.initOss();
  }

  /**
   * 验证文件
   */
  verify({ originalname, name = originalname, size, path }: verifyOptions) {
    let error;

    if (!name) error = '请上传有效文件';

    const suffix = extname(name).slice(1);
    const fileLimitKey = findKey(this.fileLimit, { suffixs: [suffix] });
    if (!fileLimitKey) error = '禁止上传该类型文件';

    const fileLimit = this.fileLimit[fileLimitKey];
    if (size > fileLimit.maxSizeMB * 1024 * 1024) error = `${fileLimit.name}文件大小不能大于 ${fileLimit.maxSizeMB} MB`;

    if (error) {
      path && this.delete(path);
      throw new UnsupportedMediaTypeException(error);
    }
  }

  /**
   * 删除文件
   */
  async delete(path: string) {
    try {
      await fs.unlink(path);
    } catch {}
  }

  // ------------------------------------------- 阿里云 oss 上传 start ------------------------------------------- //

  oss: OSS;
  sts: OSS.STS;
  policy: object;
  expirationSeconds = 15 * 60; // sts 到期时间/秒

  initOss = () => {
    const { accessKeyId, accessKeySecret, oss } = this.ali;
    const { bucket, region, internal, secure } = oss;
    if (!accessKeyId || !accessKeySecret) return;
    this.oss = new OSS({ accessKeyId, accessKeySecret, bucket, region, internal, secure });
    this.sts = new OSS.STS({ accessKeyId, accessKeySecret });
    this.policy = {
      Statement: [{ Effect: 'Allow', Action: ['oss:PutObject'], Resource: [`acs:oss:*:*:${bucket}/*`] }],
      Version: '1',
    };
  };

  /**
   * 获取临时上传密钥
   */
  async getSTS() {
    const token = await this.sts.assumeRole(this.ali.oss.arn, this.policy, this.expirationSeconds);
    const { region, bucket } = this.ali.oss;

    return {
      accessKeyId: token.credentials.AccessKeyId,
      accessKeySecret: token.credentials.AccessKeySecret,
      stsToken: token.credentials.SecurityToken,
      region,
      bucket,
    };
  }

  /**
   * 获取 OSS 上传对象属性
   */
  getPutObject(fileName: string) {
    const { bucket, region } = this.ali.oss;
    const day = dayjs().format('YYYY-MM-DD');
    const name = `${this.uploadPath}/${day}/${nuid.next() + extname(fileName)}`;

    return {
      name, // OSS 对象名称
      url: `https://${bucket}.${region}.aliyuncs.com/${name}`, // OSS 访问地址
    };
  }

  // ------------------------------------------- 阿里云 oss 上传  end  ------------------------------------------- //
}
