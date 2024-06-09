import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  baseRoute(): { message: string; code: number; status: string } {
    return this.appService.getHealth();
  }
}
