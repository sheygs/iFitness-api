import { Module } from '@nestjs/common';
import { AddOnServicesController } from './addon-services.controller';
import { AddOnServicesService } from './addon-services.service';

@Module({
  controllers: [AddOnServicesController],
  providers: [AddOnServicesService],
})
export class AddOnServicesModule {}
