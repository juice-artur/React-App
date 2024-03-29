import { Injectable } from '@nestjs/common';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';
import { TaskColumn } from './entities/task-column.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskColumnsService {

  constructor(
    @InjectRepository(TaskColumn)
    private taskColumnRepository: Repository<TaskColumn>) { }

  async create(createTaskColumnDto: CreateTaskColumnDto) {
     let Columnn = await  (await this.taskColumnRepository.find())
     .sort((prev:TaskColumn, curr:TaskColumn) => prev.position - curr.position);
     
     let targetPos =  Columnn.length > 0 ? Columnn[0].position / 2 : 1000;
     createTaskColumnDto.position = targetPos;
    const newColumn = this.taskColumnRepository.create({ ...createTaskColumnDto });
    
    const savedTask = await this.taskColumnRepository.save(newColumn);
    return savedTask;
  }

  findAll() {
    return this.taskColumnRepository.find();
  }

  findOne(id: number) {
    return this.taskColumnRepository.findOne({
      where: { id }
    });
  }

  async update(id: number, updateTaskColumnDto: UpdateTaskColumnDto) {
    const taskColumnToUpdate = await this.taskColumnRepository.findOne({
      where: { id },
    });

    if (!taskColumnToUpdate) {
      throw new Error(`Task with ID ${id} not found`);
    }

    taskColumnToUpdate.title = updateTaskColumnDto.title;
    taskColumnToUpdate.description = updateTaskColumnDto.description;
    taskColumnToUpdate.position = updateTaskColumnDto.position;
    taskColumnToUpdate.created_at = updateTaskColumnDto.created_at;
    taskColumnToUpdate.updated_at = updateTaskColumnDto.updated_at;

    return await this.taskColumnRepository.save(taskColumnToUpdate);
  }

  async remove(id: number) {
    await this.taskColumnRepository.delete(id);
  }
}
