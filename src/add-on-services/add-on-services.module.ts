import { Module } from '@nestjs/common';
import { AddOnServicesController } from './add-on-services.controller';
import { AddOnServicesService } from './add-on-services.service';

@Module({
  controllers: [AddOnServicesController],
  providers: [AddOnServicesService]
})
export class AddOnServicesModule {}
