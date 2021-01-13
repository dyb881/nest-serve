/**
 * 数据类型
 */
export enum Application {
  Json = 'application/json', // json格式
  Form = 'application/x-www-form-urlencoded', // 表单对象格式
}

/**
 * 默认请求配置
 */
export type TConfig = {
  mode?: 'same-origin' | 'no-cors' | 'cors' | 'navigate'; // 请求的模式
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; // 请求类型，部分后端只能识别大写
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'; // 缓存模式
  credentials?: 'omit' | 'same-origin' | 'include'; // 是否应该在来源请求中发送来自其他域的cookie
  responseType?: 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text'; // 响应数据类型
  // 请求头
  headers?: {
    'Content-Type'?: Application; // 传递参数格式
    [key: string]: any;
  };
  timeout?: number; // 请求超时
  body?: any; // 请求主体
  url?: string; // 请求地址
  data?: any; // 请求元数据，转为主体前的数据
  label?: string; // 请求标签，一般用于请求日志标记
  [key: string]: any;
};

/**
 * 错误解析字段
 */
export type TErrorTexts = { [key: string]: string };

/**
 * 状态码 key
 * 返回结果中，用于匹配状态码的 key
 */
export type TStatusCodeKeys = string[];

/**
 * 匹配信息提示的 key
 */
export type TMessageKeys = string[];

/**
 * 成功状态码
 */
export type TSuccessCodes = (number | string)[];

/**
 * 请求拦截，可以返回拦截处理的配置
 */
export type TInterceptorsRequest = (config: TConfig) => TConfig;

/**
 * 响应拦截，可以返回拦截处理的结果
 */
export type TInterceptorsResponse = (res: any, config: TConfig) => any;

/**
 * 用于发出请求的方法
 */
export type TRequestFunction = (config: TConfig) => Promise<any>;

/**
 * 响应返回的数据结构
 */
export type TRequestReturn = {
  ok: boolean; // 请求结果是否逻辑判断成功
  time: {
    start: string; // 开始请求时间
    end: string; // 结束请求时间
    total: string; // 请求时长
  };
  error?: any; // 错误代码
  errorText?: string; // 错误文本解析
  // 请求结果
  [key: string]: any;
};

/**
 * 初始化配置
 */
export type TRequestConfig = {
  host?: string; // API地址
  apiPath?: string; // API目录
  defaultConfig?: TConfig; // 默认请求配置
  errorTexts?: TErrorTexts; // 错误解析字段
  statusCodeKeys?: TStatusCodeKeys; // 状态码 key
  messageKeys?: TMessageKeys; // 匹配信息提示的 key
  successCodes?: TSuccessCodes; // 成功状态码
  interceptorsRequest?: TInterceptorsRequest; // 请求拦截，可以返回拦截处理的配置
  interceptorsResponse?: TInterceptorsResponse; // 响应拦截，可以返回拦截处理的结果
  requestFunction?: TRequestFunction; // 用于发出请求的方法
  asyncHost?: () => string; // 异步获取host
};
