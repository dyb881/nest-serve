import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

describe('AccountController', () => {
  let accountController: AccountController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();

    accountController = app.get<AccountController>(AccountController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(accountController.getHello()).toBe('Hello World!');
    });
  });
});
