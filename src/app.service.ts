import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): { message: string; code: number; status: string } {
    return {
      code: 200,
      status: 'success',
      message: 'okay ✅',
    };
  }
}
