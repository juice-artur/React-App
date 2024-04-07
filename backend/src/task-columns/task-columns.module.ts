import { Module } from '@nestjs/common';
import { TaskColumnsService } from './task-columns.service';
import { TaskColumnsController } from './task-columns.controller';
import { TaskColumn } from './entities/task-column.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../board/entities/board.entity';
import { HistoryOfChangesBoard } from '../history-of-changes-board/entities/history-of-changes-board.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TaskColumn]),
  TypeOrmModule.forFeature([Board]),
  TypeOrmModule.forFeature([HistoryOfChangesBoard]),],
  controllers: [TaskColumnsController],
  providers: [TaskColumnsService],
})
export class TaskColumnsModule {}
