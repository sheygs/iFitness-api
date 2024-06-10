import { Controller, Get } from '@nestjs/common';
import { AppService, BaseResponse } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Health-Check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  baseRoute(): BaseResponse {
    return this.appService.getHealth();
  }
}
