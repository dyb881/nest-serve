import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { logger } from './logger';

export interface Response<T> {
  code: number;
  data: T;
}

const line = '-'.repeat(50);

/**
 * 响应参数转化为统一格式
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    logger.log(line, '请求接收');
    logger.request(req);
    return next.handle().pipe(
      map((data) => ({ code: res.statusCode, data })),
      tap((res) => {
        logger.log(res, '响应结果');
        logger.log(line, '请求成功');
      })
    );
  }
}
