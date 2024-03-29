import { Test, TestingModule } from '@nestjs/testing';
import { HistoryOfChangesBoardService } from './history-of-changes-board.service';

describe('HistoryOfChangesBoardService', () => {
  let service: HistoryOfChangesBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryOfChangesBoardService],
    }).compile();

    service = module.get<HistoryOfChangesBoardService>(HistoryOfChangesBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
