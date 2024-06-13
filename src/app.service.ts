import { Injectable } from '@nestjs/common';
import { Utils } from './shared';

@Injectable()
export class AppService {
  constructor(private readonly utils: Utils) {}

  getHealth() {
    return this.utils.sucessResponse<object>(200, 'okay ✅');
  }
}
