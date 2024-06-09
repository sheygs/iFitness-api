import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { Status, SuccessResponse, FailureResponse } from './utils.interface';

@Injectable({})
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
    errorMessage: string,
    path: string,
    name?: string,
    stack?: string,
  ): FailureResponse {
    return {
      code,
      status: Status.FAILURE,
      error: {
        ...(name && { name }),
        message: errorMessage,
        path,
        ...(process.env.NODE_ENV === 'production' ? null : { stack }),
      },
    };
  }
}
