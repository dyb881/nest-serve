import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { log } from '../tool';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const end = log('log', req);
    return next.handle().pipe(
      map(data => ({ code: 0, data })),
      tap(() => end())
    );
  }
}
