import { Test, TestingModule } from '@nestjs/testing';
import { PublicDecoratorService } from './public-decorator.service';

describe('PublicDecoratorService', () => {
  let service: PublicDecoratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicDecoratorService],
    }).compile();

    service = module.get<PublicDecoratorService>(PublicDecoratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
