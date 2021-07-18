import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoggerService } from '@app/public-module';
import { toIp } from '@app/public-tool';

export interface Response<T> {
  code: number;
  data: T;
}

let num = 0;
const line = '-'.repeat(50);
const interval = '/'.repeat(50);

/**
 * 响应参数转化为统一格式
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    this.loggerService.log(interval, `第 ${++num} 次请求`);
    this.loggerService.log(line, '请求接收');

    // 答应请求内容
    const { url, ip, method, user, body } = req;
    this.loggerService.log(url, `${toIp(ip)} ${method}`);
    user?.username && this.loggerService.log(user.username, '用户名');
    Object.keys(body).length && this.loggerService.log(body, '请求参数');

    return next.handle().pipe(
      map((data) => ({ code: res.statusCode, data })),
      tap((res) => {
        this.loggerService.log(res, '响应结果');
        this.loggerService.log(line, '请求成功');
      })
    );
  }
}
