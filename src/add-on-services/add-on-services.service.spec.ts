import { Test, TestingModule } from '@nestjs/testing';
import { AddOnServicesService } from './add-on-services.service';

describe('AddOnServicesService', () => {
  let service: AddOnServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddOnServicesService],
    }).compile();

    service = module.get<AddOnServicesService>(AddOnServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
