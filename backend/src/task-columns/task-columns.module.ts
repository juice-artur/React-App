import { Module } from '@nestjs/common';
import { TaskColumnsService } from './task-columns.service';
import { TaskColumnsController } from './task-columns.controller';

@Module({
  controllers: [TaskColumnsController],
  providers: [TaskColumnsService],
})
export class TaskColumnsModule {}
