import { Test, TestingModule } from '@nestjs/testing';
import { EggUserService } from './user.service';

describe('UserService', () => {
  let service: EggUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EggUserService],
    }).compile();

    service = module.get<EggUserService>(EggUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
