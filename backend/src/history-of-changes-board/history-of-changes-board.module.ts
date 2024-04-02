import { Module } from '@nestjs/common';
import { HistoryOfChangesBoardService } from './history-of-changes-board.service';
import { HistoryOfChangesBoardController } from './history-of-changes-board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskColumn } from 'src/task-columns/entities/task-column.entity';
import { HistoryOfChangesBoard } from './entities/history-of-changes-board.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TaskColumn]),
  TypeOrmModule.forFeature([HistoryOfChangesBoard]) ],
  controllers: [HistoryOfChangesBoardController],
  providers: [HistoryOfChangesBoardService],
})
export class HistoryOfChangesBoardModule {}
