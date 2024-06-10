import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { Status, SuccessResponse, FailureResponse } from './utils.interface';

@Injectable()
export class Utils {
  sucessResponse<T>(
    code: number,
    message: string,
    data?: T,
  ): SuccessResponse<T> {
    return {
      code,
      status: Status.SUCCESS,
      message,
      data: data ?? {},
    };
  }

  failureResponse(
    code: number,
    message: string,
    path: string,
    stack?: string,
    name?: string,
  ): FailureResponse {
    return {
      code,
      status: Status.FAILURE,
      error: {
        ...(name && { name }),
        message,
        path,
        ...(stack && { stack }),
      },
    };
  }
}
