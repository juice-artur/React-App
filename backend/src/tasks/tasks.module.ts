import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskProfile } from './task.profile';
import { AutoMapperModule } from './AutoMapperModule';



@Module({
  imports: [TypeOrmModule.forFeature([Task]),
    AutoMapperModule
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskProfile],
})
export class TasksModule { }
