import { Injectable } from '@nestjs/common';
import OSS from 'ali-oss';
import { extname } from 'path';
import dayjs from 'dayjs';
import nuid from 'nuid';

export type AliOssServiceOptions = OSS.Options & {
  arn: string; // 角色 arn
  path: string; // 上传路径文件夹
};

/**
 * 阿里云
 * OSS对象存储
 */
@Injectable()
export class AliOssService {
  oss: OSS;
  sts: OSS.STS;
  policy: object;

  constructor(private readonly options: AliOssServiceOptions) {
    const { arn, path, ...ossOptions } = options;
    const { accessKeyId, accessKeySecret, bucket } = options;
    this.oss = new OSS(ossOptions);
    this.sts = new OSS.STS({ accessKeyId, accessKeySecret });
    this.policy = {
      Statement: [{ Effect: 'Allow', Action: ['oss:PutObject'], Resource: [`acs:oss:*:*:${bucket}/*`] }],
      Version: '1',
    };
  }

  async getSTS() {
    const token = await this.sts.assumeRole(this.options.arn, this.policy, 15 * 60);
    const { region, bucket } = this.options;

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
    const { bucket, region, path } = this.options;
    const day = dayjs().format('YYYY-MM-DD');
    const name = `${path}/${day}/${nuid.next() + extname(fileName)}`;

    return {
      name, // OSS 对象名称
      url: `https://${bucket}.${region}.aliyuncs.com/${name}`, // OSS 访问地址
    };
  }
}
