import { Test, TestingModule } from '@nestjs/testing';
import { UsersWsService } from './users-ws.service';

describe('UsersWsService', () => {
  let service: UsersWsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersWsService],
    }).compile();

    service = module.get<UsersWsService>(UsersWsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
