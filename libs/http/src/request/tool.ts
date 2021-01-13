import fetch, { Response } from 'node-fetch';
import FormData from 'form-data';
import qs from 'qs';
import {
  Application,
  TConfig,
  TErrorTexts,
  TInterceptorsRequest,
  TInterceptorsResponse,
  TRequestFunction,
} from './types';

/**
 * 根据数据类型生成方法
 */
const toBodyFuns = {
  [Application.Json]: JSON.stringify,
  [Application.Form]: qs.stringify,
};

/**
 * data 转为请求主体
 */
export const toBody = (config: TConfig) => {
  if (config.method === 'GET') {
    // 把参数转化后拼接到 url
    const params = qs.stringify(config.data);
    if (params) config.url += `?${params}`;
  } else {
    const toBodyFun = toBodyFuns[config.headers?.['Content-Type']!];
    const { data } = config;
    if (toBodyFun) {
      // 根据请求类型处理转化 data 为 body
      config.body = toBodyFun(data);
    } else {
      // 把 data 转化为 FormData 对象赋值到 body
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      config.body = formData;
    }
  }
  return config;
};

/**
 * 异常分析 错误信息 => 错误解析文本
 */
export const errorMatchText = (errorTexts: TErrorTexts, error: any) => {
  const errorText = (typeof error === 'object' && error.message) || error;
  for (const [key, item] of Object.entries(errorTexts)) {
    // 正则匹配得到错误文本
    if (new RegExp(key).test(errorText)) return item;
  }
  return '其他错误';
};

const urlReg = /^http/;

/**
 * 判断是否完整 url
 */
export const isCompleteUrl = (url: string) => urlReg.test(url);

/**
 * 统计时间
 */
export const statisticalTime = () => {
  const start = new Date();
  return () => {
    const end = new Date();
    return {
      start: start.toTimeString(),
      end: end.toTimeString(),
      total: `${(+end - +start) / 1000}秒`,
    };
  };
};

/**
 * 请求拦截
 */
export const interceptorsRequest: TInterceptorsRequest = (config) => config;

/**
 * 响应拦截
 */
export const interceptorsResponse: TInterceptorsResponse = (res, _config) => res;

/**
 * 请求方法
 */
export const requestFunction: TRequestFunction = (config) => {
  // 转为主体
  config = toBody(config);

  // 请求超时
  const timeout = new Promise((_, reject) =>
    setTimeout(() => {
      reject('request timeout');
    }, config.timeout)
  );

  return Promise.race([fetch(config.url!, config), timeout]).then((response) => {
    if (response instanceof Response) {
      const { responseType } = config;

      if (responseType !== 'json' && responseType && response[responseType]) {
        // 返回特定解析类型
        return { [responseType]: response[responseType](), response };
      }

      return response.json();
    }
    return response;
  });
};
