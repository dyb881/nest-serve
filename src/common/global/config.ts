import { TServeConfig } from './config.types';

export const serveConfig: TServeConfig = {
  sql: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Deng3364',
    database: 'nest_serve_db',
  },
  protocol: 'http',
  hostname: 'localhost',
  port: 8080,
  prefix: '/api',
  get url() {
    let url = `${this.protocol}://${this.hostname}`;
    if (![80, 443].includes(this.port)) url += `:${this.port}`;
    return url;
  },
  get apiUrl() {
    return `${this.url}${this.prefix}`;
  },
  swaggerPath: 'swagger',
  get swaggerUrl() {
    return `${this.url}/${this.swaggerPath}`;
  },
  file: [
    {
      key: 'image',
      label: '图片',
      suffix: ['jpg', 'png', 'git', 'ico', 'jpeg'],
      size: 1048576 * 5,
    },
    {
      key: 'video',
      label: '视频',
      suffix: ['mp3'],
      size: 1048576 * 30,
    },
    {
      key: 'audio',
      label: '音频',
      suffix: ['mp4'],
      size: 1048576 * 100,
    },
    {
      key: 'other',
      label: '其他',
      suffix: ['doc', 'md'],
      size: 1048576 * 10,
    },
  ],
  jwt: { secret: 'nestservedyb881' },
};
