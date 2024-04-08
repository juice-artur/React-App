import { Injectable } from '@nestjs/common';
import { CreateHistoryOfChangesBoardDto } from './dto/create-history-of-changes-board.dto';
import { UpdateHistoryOfChangesBoardDto } from './dto/update-history-of-changes-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryOfChangesBoard } from './entities/history-of-changes-board.entity';
import { TaskColumn } from '../task-columns/entities/task-column.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryOfChangesBoardService {
  constructor(    
  @InjectRepository(TaskColumn)
  private taskRepository: Repository<TaskColumn>,
  @InjectRepository(HistoryOfChangesBoard)
  private historyOfChangesBoardRepository: Repository<HistoryOfChangesBoard>)
  {}

  async findAllByBoardId(id: number) {

    return  await this.historyOfChangesBoardRepository.find({
      where: { board: { id: id } },
      relations: ['board']
    });
  }

}
