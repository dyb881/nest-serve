import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let code = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let msg;

    console.log('报错信息', exception);

    if (exception instanceof HttpException) {
      const { statusCode, error: err, message } = exception.message;
      code = statusCode;
      error = err;
      msg = message;
    }

    response.status(code).json({
      code,
      error,
      message: msg || HttpStatusText[error],
    });
  }
}

// 错误状态码中文
const HttpStatusText = {
  'Not Found': '未找到地址',
  'Internal Server Error': '服务器错误',
};
