import { Application, TConfig, TErrorTexts, TStatusCodeKeys, TMessageKeys, TSuccessCodes } from './types';

/**
 * 默认请求配置
 */
export const defaultConfig: TConfig = {
  mode: 'cors',
  method: 'GET',
  cache: 'default',
  credentials: 'omit',
  responseType: 'json',
  headers: {
    'Content-Type': Application.Json,
  },
  timeout: 5000,
};

/**
 * 默认错误解析字段
 */
export const errorTexts: TErrorTexts = {
  timeout: '网络连接超时',
  'The user aborted a request': '网络连接超时',
  'Network Error': '请求地址错误',
  'Failed to fetch': '请求地址错误',
  'request:fail': '请求地址错误',
};

/**
 * 状态码 key
 * 返回结果中，用于匹配状态码的 key
 */
export const statusCodeKeys: TStatusCodeKeys = ['status', 'code'];

/**
 * 匹配信息提示的 key
 */
export const messageKeys: TMessageKeys = ['msg', 'message', 'Message'];

/**
 * 成功状态码
 */
export const successCodes: TSuccessCodes = [
  0,
  '0',
  200,
  201,
  '0000',
  '1000',
  1000,
  1001,
  1002,
  1003,
  1004,
  1005,
  2000,
  80000,
];
