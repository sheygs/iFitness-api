import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Health Check')
export class AppController {
  constructor(private readonly healthService: AppService) {}

  @Get()
  baseRoute() {
    return this.healthService.getHealth();
  }
}
