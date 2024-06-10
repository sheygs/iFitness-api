import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { Status, SuccessResponse, FailureResponse } from './utils.interface';

@Injectable()
export class Utilities {
  sucessResponse<T>(
    code: number,
    data: T,
    message: string,
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
