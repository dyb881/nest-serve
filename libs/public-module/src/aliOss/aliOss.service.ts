import { Injectable } from '@nestjs/common';
import OSS from 'ali-oss';
import { extname } from 'path';
import dayjs from 'dayjs';
import nuid from 'nuid';
import { UploadServiceOptions, UploadService } from '../upload';

export type AliOssServiceOptions = UploadServiceOptions &
  OSS.Options & {
    arn: string; // 角色 arn
    uploadPath: string; // 上传路径文件夹
  };

/**
 * 阿里云
 * OSS对象存储
 */
@Injectable()
export class AliOssService extends UploadService {
  oss: OSS;
  sts: OSS.STS;
  policy: object;

  constructor(readonly options: AliOssServiceOptions) {
    super({ fileLimit: options.fileLimit });
    const { accessKeyId, accessKeySecret, bucket, endpoint, region, internal, secure, timeout, cname } = options;
    this.oss = new OSS({ accessKeyId, accessKeySecret, bucket, endpoint, region, internal, secure, timeout, cname });
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
    const { bucket, region, uploadPath } = this.options;
    const day = dayjs().format('YYYY-MM-DD');
    const name = `${uploadPath}/${day}/${nuid.next() + extname(fileName)}`;

    return {
      name, // OSS 对象名称
      url: `https://${bucket}.${region}.aliyuncs.com/${name}`, // OSS 访问地址
    };
  }
}
