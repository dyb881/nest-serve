import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject, LoggerService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { requestLogger } from '../tools';

export interface Response<T> {
  code: number;
  data: T;
}

/**
 * 响应参数转化为统一格式
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const resNext = next.handle();

    return resNext.pipe(
      map((data) => ({ code: res.statusCode, data })), // 响应参数转化为统一格式
      tap((res) => {
        requestLogger(this.loggerService, req, () => {
          this.loggerService.log('\n' + JSON.stringify(res, null, 2), '响应结果');
        });
      }),
    );
  }
}
