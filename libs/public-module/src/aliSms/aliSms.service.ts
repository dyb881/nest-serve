import { Injectable, BadRequestException } from '@nestjs/common';
import AliSms, { SendSmsRequest } from '@alicloud/dysmsapi20170525';
import { Config } from '@alicloud/openapi-client';

export type AliSmsServiceOptions = {
  accessKeyId: string;
  accessKeySecret: string;
};

export type SendSmsRequestOptions = {
  signName: string; // 短信签名
  templateCode: string; // 短信模版ID
  templateParam?: { [key: string]: string }; // 短信模版对应的参数
  phoneNumbers: string; // 发送的短信
};

/**
 * 阿里云
 * 短信通知服务
 */
@Injectable()
export class AliSmsService {
  aliSms: AliSms;

  constructor({ accessKeyId, accessKeySecret }: AliSmsServiceOptions) {
    const config = new Config({
      accessKeyId,
      accessKeySecret,
      endpoint: 'dysmsapi.aliyuncs.com',
    });
    this.aliSms = new AliSms(config);
  }

  /**
   * 发送短信
   */
  async send({ templateParam, ...options }: SendSmsRequestOptions) {
    let sendSmsRequest = new SendSmsRequest({
      ...options,
      templateParam: JSON.stringify(templateParam),
    });
    const res = await this.aliSms.sendSms(sendSmsRequest);
    if (res.body.code !== 'ok') {
      throw new BadRequestException(chinese.test(res.body.message) ? res.body.message : '短信发送失败');
    }
  }
}

// 判断是否中文
const chinese = /.*[\u4e00-\u9fa5]+.*/;
