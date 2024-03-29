import { Module } from '@nestjs/common';
import { HistoryOfChangesBoardService } from './history-of-changes-board.service';
import { HistoryOfChangesBoardController } from './history-of-changes-board.controller';

@Module({
  controllers: [HistoryOfChangesBoardController],
  providers: [HistoryOfChangesBoardService],
})
export class HistoryOfChangesBoardModule {}
