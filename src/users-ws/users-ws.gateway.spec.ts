import { Test, TestingModule } from '@nestjs/testing';
import { UsersWsGateway } from './users-ws.gateway';
import { UsersWsService } from './users-ws.service';

describe('UsersWsGateway', () => {
  let gateway: UsersWsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersWsGateway, UsersWsService],
    }).compile();

    gateway = module.get<UsersWsGateway>(UsersWsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
