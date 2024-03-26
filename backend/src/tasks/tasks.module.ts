import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskProfile } from './task.profile';
import { AutoMapperModule } from './AutoMapperModule';
import { TaskColumn } from 'src/task-columns/entities/task-column.entity';
import { HistoryOfChangesTask } from 'src/history-of-changes-task/entities/history-of-changes-task.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([TaskColumn]),
    TypeOrmModule.forFeature([HistoryOfChangesTask]),
    AutoMapperModule
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskProfile],
})
export class TasksModule { }
