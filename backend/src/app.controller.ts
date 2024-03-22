import { Controller, Get } from '@nestjs/common';
import { TasksService } from './models/entities/task/tasks.service';

@Controller()
export class AppController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getHello(): Promise<string> {
    const task = await this.tasksService.findOne(0);
    return task ? task.title : 'Task not found';
  }
}
