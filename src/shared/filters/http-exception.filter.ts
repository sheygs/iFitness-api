import 'dotenv/config';
import { Response, Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  Inject,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Utils } from '../utilities';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(Utils) private utils: Utils,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(error: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const res = context.getResponse<Response>();

    const errName = error.name;

    const status = error.getStatus();

    const stack = process.env.NODE_ENV === 'production' ? null : error.stack;

    const message = this.getErrorMessage(error);

    const path = request ? request.url : null;

    const errResponse = this.utils.failureResponse(
      status,
      message,
      path,
      stack,
      errName,
    );

    this.logger.error(`${JSON.stringify(errResponse)}`);

    res.status(status).json(errResponse);
  }

  private getErrorMessage(exception: HttpException): string | object {
    const response = exception.getResponse();

    if (typeof response === 'string') {
      return response;
    }

    if (typeof response === 'object' && response['message']) {
      return response['message'];
    }

    return 'Internal Server Error';
  }
}
