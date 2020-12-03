/**
 * 服务配置
 */
export type TServeConfig = {
  sql: TSql;
  protocol: 'http' | 'https'; // 协议
  hostname: string; // 主机IP或域名
  port: number; // 服务端口
  prefix: string; // 接口请求前缀
  url: string; // 服务地址
  apiUrl: string; // api地址
  swaggerPath: string; // swagger 路径
  swaggerUrl: string; // swagger 地址
  file: TFile[];
  jwt: TJwt;
};

/**
 * 数据库配置
 */
type TSql = {
  host: string; // 数据服务IP或域名
  port: number; // 端口
  username: string; // 用户名
  password: string; // 密码
  database: string; // 数据库
};

/**
 * 文件配置
 */
type TFile = {
  key: string; // 类型key
  label: string; // 类型说明
  suffix: string[]; // 类型允许的后缀名
  size: number; // 类型允许的文件大小
};

/**
 * 鉴权配置
 */
type TJwt = {
  secret: string;
};
