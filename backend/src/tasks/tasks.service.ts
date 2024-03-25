import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { TaskDto } from './dto/task.dto';

import { TaskColumn } from 'src/task-columns/entities/task-column.entity';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(TaskColumn)
    private taskColumnRepository : Repository<TaskColumn>,
    @InjectMapper()  private classMapper:  Mapper,
  ) { 
  }

  async create(createTaskDto: CreateTaskDto) : Promise<TaskDto | undefined> {
    const { columnId, ...taskData } = createTaskDto;
    const column = await this.taskColumnRepository.findOne({
      where: { id : columnId }});
    if (!column) {
      throw new Error(`TaskColumn with ID ${columnId} not found`);
    }
     let tasksInTargerColumn = await (await this.taskRepository.find({relations: ['column']}))
     .filter((t:Task) => t.column.id == columnId).sort((prev:Task, curr:Task) => prev.position - curr.position);
     let targetPos =  tasksInTargerColumn.length > 0 ? tasksInTargerColumn[0].position / 2 : 1000;
     taskData.position = targetPos;
    const newTask = this.taskRepository.create({ ...taskData, column });
    
    const savedTask = await this.taskRepository.save(newTask);
    return this.classMapper.mapAsync( savedTask, Task, TaskDto );
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

  async update(id: number, updateTaskDto: UpdateTaskDto) : Promise<TaskDto | undefined> {
    const { title, description, position, created_at, updated_at, columnId } = updateTaskDto;
    const taskToUpdate = await this.taskRepository.findOne({
      where: { id },
      relations: ['column']
  });

    if (!taskToUpdate) {
        throw new Error(`Task with ID ${id} not found`);
    }

    const column = await this.taskColumnRepository.findOne({ where: { id: columnId } });

    if (!column) {
        throw new Error(`TaskColumn with ID ${columnId} not found`);
    }

    taskToUpdate.title = title;
    taskToUpdate.description = description;
    taskToUpdate.position = position;
    taskToUpdate.created_at = created_at;
    taskToUpdate.updated_at = updated_at;
    taskToUpdate.column = column;

    return this.classMapper.mapAsync( await this.taskRepository.save(taskToUpdate), Task, TaskDto );
  }

  async remove(id: number) {
    await this.taskRepository.delete(id);
  }
}
