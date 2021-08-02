import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { TcpContext } from '@nestjs/microservices';
import { LoggerService } from '@app/public-module';
import { throwError } from 'rxjs';

const line = '-'.repeat(50);

/**
 * 报错过滤器
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let errorLog = exception;
    let code = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let msg;

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res !== 'string') {
        const { statusCode = exception.getStatus(), message, error: err = message } = res as any;
        code = statusCode;
        error = err;
        msg = Array.isArray(message) ? message[0] : message;
      }
    } else if (exception.response) {
      const { statusCode, message, error: err = message } = exception.response;
      code = statusCode;
      error = err;
      msg = Array.isArray(message) ? message[0] : message;
    } else {
      this.loggerService.error(errorLog, '服务运行错误');
    }

    // 尽可能转为中文
    const message = (chinese.test(msg) && msg) || HttpStatusText[error] || error;

    const resJson = { code, error, message };

    // 错误日志
    this.loggerService.error(resJson, '响应错误');
    this.loggerService.log(line, '请求结束');

    if (response instanceof TcpContext) {
      return throwError(exception);
    }

    response.status(code).json(resJson);
  }
}

// 判断是否中文
const chinese = /.*[\u4e00-\u9fa5]+.*/;

// 错误状态码中文
const HttpStatusText = {
  'Bad Request': '请求参数错误',
  Unauthorized: '未经授权',
  'Not Found': '未找到地址',
  'Internal Server Error': '服务器错误',
  Forbidden: '权限不足',
  'Request Timeout': '请求超时异常',
};

/*

Bad Request Exception 错误的请求异常
Unauthorized Exception 未经授权的例外
Not Found Exception 找不到异常
Forbidden Exception 禁止例外
Not Acceptable Exception 不可接受的例外
Request Timeout Exception 请求超时异常
Conflict Exception 冲突例外
Gone Exception 异常消失
Pay load Too Large Exception 有效负载过大
Unsupported Media Type Exception 不支持的媒体类型异常
Unprocessab le Exception 无法处理的异常
Internal Server Error Exception 内部服务器错误异常
Not Imp lemented Exception 未实施异常
Bad Gateway Exception 错误的网关异常
Service Unavailab le Exception 服务不可用异常
Gateway Timeout Exception 网关超时异常

*/
