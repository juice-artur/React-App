import { Test, TestingModule } from '@nestjs/testing';
import { HistoryOfChangesBoardController } from './history-of-changes-board.controller';
import { HistoryOfChangesBoardService } from './history-of-changes-board.service';

describe('HistoryOfChangesBoardController', () => {
  let controller: HistoryOfChangesBoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryOfChangesBoardController],
      providers: [HistoryOfChangesBoardService],
    }).compile();

    controller = module.get<HistoryOfChangesBoardController>(HistoryOfChangesBoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
