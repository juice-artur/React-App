import { Injectable } from '@nestjs/common';
import { CreateHistoryOfChangesTaskDto } from './dto/create-history-of-changes-task.dto';
import { UpdateHistoryOfChangesTaskDto } from './dto/update-history-of-changes-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../tasks/entities/task.entity';
import { HistoryOfChangesTask } from './entities/history-of-changes-task.entity';

@Injectable()
export class HistoryOfChangesTaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(HistoryOfChangesTask)
    private historyOfChangesTaskRepository: Repository<HistoryOfChangesTask>
  ) { }

  async create(createHistoryOfChangesTaskDto: CreateHistoryOfChangesTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id: createHistoryOfChangesTaskDto.task_id },
      relations: ['column']
    });

    const newChanges = this.historyOfChangesTaskRepository.create({
      ...createHistoryOfChangesTaskDto,
      task: task
    });
    const savedChanges = await this.historyOfChangesTaskRepository.save({...newChanges});

    return savedChanges;
  }


  async findAllByTaskId(id: number) {
    return  await this.historyOfChangesTaskRepository.find({
      where: { task: { id: id } },
      relations: ['task']
    });;
  }

  findAll() {
    return `This action returns all historyOfChangesTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historyOfChangesTask`;
  }

  update(id: number, updateHistoryOfChangesTaskDto: UpdateHistoryOfChangesTaskDto) {
    return `This action updates a #${id} historyOfChangesTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyOfChangesTask`;
  }
}
