import { Injectable } from '@nestjs/common';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';
import { TaskColumn } from './entities/task-column.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';

@Injectable()
export class TaskColumnsService {

  constructor(
    @InjectRepository(TaskColumn)
    private taskColumnRepository: Repository<TaskColumn>) { }
  create(createTaskColumnDto: CreateTaskColumnDto) {
    return 'This action adds a new taskColumn';
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

    console.log(updateTaskColumnDto);
    taskColumnToUpdate.title = updateTaskColumnDto.title;
    taskColumnToUpdate.description = updateTaskColumnDto.description;
    taskColumnToUpdate.position = updateTaskColumnDto.position;
    taskColumnToUpdate.created_at = updateTaskColumnDto.created_at;
    taskColumnToUpdate.updated_at = updateTaskColumnDto.updated_at;

    return await this.taskColumnRepository.save(taskColumnToUpdate);
  }

  remove(id: number) {
    return `This action removes a #${id} taskColumn`;
  }
}
