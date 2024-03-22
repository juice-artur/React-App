import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  findOne(id: number): Promise<TaskEntity | undefined> {
    return this.taskRepository.findOneBy({id});
  }
  findAll() : Promise<TaskEntity[] | undefined> {
    return this.taskRepository.find();
  }
  async update(id: number, updatedTask: Partial<TaskEntity>): Promise<TaskEntity | undefined> {
    const task = await this.findOne(id);
    if (!task) {
      return undefined; 
    }
    Object.assign(task, updatedTask);
    return this.taskRepository.save(task);
  }
}