import { Injectable } from '@nestjs/common';

export interface BaseResponse {
  message: string;
  code: number;
  status: string;
  data: null;
}

@Injectable()
export class AppService {
  getHealth(): BaseResponse {
    return {
      code: 200,
      status: 'success',
      message: 'okay ✅',
      data: null,
    };
  }
}
