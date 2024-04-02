import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskColumn } from 'src/task-columns/entities/task-column.entity';
import { Board } from './entities/board.entity';
import { HistoryOfChangesBoard } from 'src/history-of-changes-board/entities/history-of-changes-board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board]),
  TypeOrmModule.forFeature([TaskColumn]),],

  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule { }
