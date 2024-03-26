import { Injectable } from '@nestjs/common';
import { CreateHistoryOfChangesTaskDto } from './dto/create-history-of-changes-task.dto';
import { UpdateHistoryOfChangesTaskDto } from './dto/update-history-of-changes-task.dto';

@Injectable()
export class HistoryOfChangesTaskService {
  create(createHistoryOfChangesTaskDto: CreateHistoryOfChangesTaskDto) {
    return 'This action adds a new historyOfChangesTask';
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
