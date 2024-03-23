import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { TaskDto } from './dto/task.dto';
import { log } from 'console';
import { first } from 'rxjs';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectMapper()  private classMapper:  Mapper,
  ) { 
  }

  create(createTaskDto: TaskDto) {
    return 'This action adds a new task';
  }

  async findAll(): Promise<TaskDto[] | undefined> {
    return this.classMapper.mapArrayAsync(await this.taskRepository.find({relations: ['column']}), Task, TaskDto);
  }

  async findOne(id: number): Promise<TaskDto | undefined> {
    return this.classMapper.mapAsync(await this.taskRepository.findOne({
      where: { id },
      relations: ['column']
      
  }), Task, TaskDto);
  }

  update(id: number, updateTaskDto: TaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
