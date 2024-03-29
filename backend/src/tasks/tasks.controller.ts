import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors  } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiParam } from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';


@Controller('/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) : Promise<TaskDto>{
    return this.tasksService.create(createTaskDto);
  }

  @Get('')
  async GetAllTasks(@Param() params: any): Promise<TaskDto[]> {
    const tasks = await this.tasksService.findAll();
    return tasks ? tasks : [];
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Task ID' })
  async GetTaskById(@Param() params: any): Promise<TaskDto> | undefined {
    const task = await this.tasksService.findOne(params.id);
    return task ? task: undefined;
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
