import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors  } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { ApiParam } from '@nestjs/swagger';
import { MapInterceptor } from '@automapper/nestjs';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';


@Controller('/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: TaskDto) {
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
    console.log(updateTaskDto)
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
