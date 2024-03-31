import { Module } from '@nestjs/common';
import { TaskColumnsService } from './task-columns.service';
import { TaskColumnsController } from './task-columns.controller';
import { TaskColumn } from './entities/task-column.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/board/entities/board.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TaskColumn]),
  TypeOrmModule.forFeature([Board])],
  controllers: [TaskColumnsController],
  providers: [TaskColumnsService],
})
export class TaskColumnsModule {}
