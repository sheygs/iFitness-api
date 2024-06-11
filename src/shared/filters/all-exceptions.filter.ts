import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';

import { Utils } from '../utilities';

// setup Sentry
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(Utils) private utils: Utils,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const name = exception instanceof HttpException ? exception.name : 'Internal Server Error';

    const stack = exception instanceof Error ? exception.stack : 'No stack available';

    const message =
      exception instanceof HttpException ? exception.message : 'Internal Server Error';

    const path = request ? request.url : null;

    const errResponse = this.utils.failureResponse(status, message, path, stack, name);

    this.logger.error(`${JSON.stringify(exception)}`);

    res.status(status).json(errResponse);
  }
}
