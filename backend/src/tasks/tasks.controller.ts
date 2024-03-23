import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('')
  async GetAllTasks(@Param() params: any): Promise<Task[]> {
    const tasks = await this.tasksService.findAll();
    return tasks ? tasks : [];
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Task ID' })
  async GetTaskById(@Param() params: any): Promise<string> {
    const task = await this.tasksService.findOne(params.id);
    return task ? task.title : 'Task not found';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
