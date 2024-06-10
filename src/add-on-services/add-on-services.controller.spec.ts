import { Test, TestingModule } from '@nestjs/testing';
import { AddOnServicesController } from './add-on-services.controller';

describe('AddOnServicesController', () => {
  let controller: AddOnServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddOnServicesController],
    }).compile();

    controller = module.get<AddOnServicesController>(AddOnServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
