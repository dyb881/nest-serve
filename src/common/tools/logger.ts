import { LoggerService } from '@nestjs/common';
import { toIp } from './data';

let num = 0;
const line = '▬'.repeat(50);

/**
 * 请求日志
 */
export const requestLogger = (logget: LoggerService, request: any, content: Function) => {
  num += 1;
  logget.log(`\nstart ${line} ${num} ${line} start`, '请求开始');
  const { url, clientIp, method, body, user } = request;
  user?.id && logget.log(`${user.id}`, '操作用户');
  logget.log(`${toIp(clientIp)} ${method} ${url}`, '请求路径');
  Object.keys(body).length && logget.log('\n' + JSON.stringify(body, null, 2), '请求参数');
  content();
  logget.log(`\n-end- ${line} ${num} ${line} -end-`, '请求结束');
};
