import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { TasksService } from './models/entities/task/tasks.service';
import { TaskEntity } from './models/entities/task/task';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('/tasks')
export class AppController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Task ID' })
  async GetTaskById(@Param() params: any): Promise<string> {
    const task = await this.tasksService.findOne(params.id);
    return task ? task.title : 'Task not found';
  }
  @Get('')
  async GetAllTasks(@Param() params: any): Promise<TaskEntity[]> {
    const tasks = await this.tasksService.findAll();
    return tasks ? tasks : [];
  }

  @Patch('/:id')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiBody({ type: TaskEntity })
  async PatchTaskById(@Param('id') id: number, @Body() taskData: Partial<TaskEntity>): Promise<string> { 
    const task = await this.tasksService.update(id, taskData); 
    return task ? task.title : 'Task not found';
  }
}
