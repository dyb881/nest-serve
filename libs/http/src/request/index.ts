import {
  interceptorsRequest,
  interceptorsResponse,
  isCompleteUrl,
  statisticalTime,
  requestFunction,
  errorMatchText,
} from './tool';
import { defaultConfig, errorTexts, statusCodeKeys, messageKeys, successCodes } from './config';
import { TConfig, TRequestConfig, TRequestReturn } from './types';
import pickBy from 'lodash/pickBy';

/**
 * 请求器
 */
export default class Request {
  host = '';
  apiPath = '';
  defaultConfig = defaultConfig;
  errorTexts = errorTexts;
  statusCodeKeys = statusCodeKeys;
  messageKeys = messageKeys;
  successCodes = successCodes;
  interceptorsRequest = interceptorsRequest;
  interceptorsResponse = interceptorsResponse;
  requestFunction = requestFunction;
  config?: TRequestConfig;
  asyncHost?: () => string;

  get baseURL() {
    return (this.asyncHost?.() || this.host) + this.apiPath;
  }

  constructor(config?: TRequestConfig) {
    config && this.init(config);
  }

  /**
   * 克隆请求器
   * 在当前请求器配置基础上合并配置，并生成新的请求
   * 主要用于一个项目面向多个服务的场景
   */
  clone = (config: TRequestConfig) => new Request({ ...this.config, ...config });

  /**
   * 初始化
   */
  private init = (config: TRequestConfig) => {
    const { defaultConfig, errorTexts, ...configs } = config;
    Object.assign(this.defaultConfig, defaultConfig);
    Object.assign(this.errorTexts, errorTexts);
    Object.assign(
      this,
      pickBy(configs, (i) => i !== undefined)
    );
    this.config = config;
  };

  /**
   * 执行请求
   */
  request = (configs: TConfig) => {
    let { url = '', ...config } = configs;

    // 非完整 url 的情况下，拼接地址
    if (!isCompleteUrl(url)) url = this.baseURL + url;

    // 请求拦截
    config = this.interceptorsRequest({ url, ...this.defaultConfig, ...config });

    // 开始统计时间
    const st = statisticalTime();

    // 执行请求
    return this.requestFunction(config)
      .catch((error) => {
        // 异常分析
        return { errorCode: error, errorText: errorMatchText(this.errorTexts, error) };
      })
      .then((res) => {
        // 无错误信息，并且响应类型是 json
        if (!res.errorText && config.responseType === 'json') {
          // 获取匹配的状态码
          const code = this.statusCodeKeys.reduce((code, key) => res[key] ?? code, '');
          // 当成功状态码匹配失败，既是请求失败
          if (!this.successCodes.includes(code)) {
            res.errorCode = code;
            // 匹配获取提示信息，并赋值给错误文本属性
            res.errorText = this.messageKeys.reduce((msg, key) => res[key] || msg, '请求异常');
          }
        }

        res.ok = !res.errorText; // 错误文本为空时，即是请求成功

        // 响应拦截
        res = this.interceptorsResponse({ time: st(), ...res }, config);

        return res as TRequestReturn;
      });
  };

  /**
   * 创建请求器
   */
  createRequest = (method: TConfig['method'], configs?: TConfig) => {
    return (url: string, data?: object, ...args: TConfig[]) => {
      return this.request(Object.assign({ method, url, data }, configs, ...args));
    };
  };

  get = this.createRequest('GET');
  post = this.createRequest('POST');
  put = this.createRequest('PUT');
  patch = this.createRequest('PATCH');
  del = this.createRequest('DELETE');
  upload = this.createRequest('POST', { headers: {} });
}
