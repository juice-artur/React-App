import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskProfile } from './task.profile';
import { AutoMapperModule } from './AutoMapperModule';
import { TaskColumn } from 'src/task-columns/entities/task-column.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([TaskColumn]),
    AutoMapperModule
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskProfile],
})
export class TasksModule { }
