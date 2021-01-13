import { Injectable, Inject } from '@nestjs/common';
import { TConfig } from './request/types';
import Request from './request';

@Injectable()
export class HttpService {
  constructor(
    @Inject('REQUEST_INSTANCE_TOKEN')
    private readonly request: Request
  ) {}

  /**
   * 创建请求器
   */
  private createRequest = (method: TConfig['method'], configs?: TConfig) => {
    return (url: string, data?: object, ...args: TConfig[]) => {
      return this.request.request(Object.assign({ method, url, data }, configs, ...args));
    };
  };

  get = this.createRequest('GET');
  post = this.createRequest('POST');
  put = this.createRequest('PUT');
  patch = this.createRequest('PATCH');
  del = this.createRequest('DELETE');
  upload = this.createRequest('POST', { headers: {} });
}
