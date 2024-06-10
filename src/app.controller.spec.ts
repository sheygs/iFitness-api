import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilitiesModule } from './shared';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UtilitiesModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "okay"', () => {
      expect(appController.baseRoute()).toEqual({
        code: 200,
        status: 'success',
        message: 'okay ✅',
        data: {},
      });
    });
  });
});
