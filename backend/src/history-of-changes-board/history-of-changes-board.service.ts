import { Injectable } from '@nestjs/common';
import { CreateHistoryOfChangesBoardDto } from './dto/create-history-of-changes-board.dto';
import { UpdateHistoryOfChangesBoardDto } from './dto/update-history-of-changes-board.dto';

@Injectable()
export class HistoryOfChangesBoardService {
  create(createHistoryOfChangesBoardDto: CreateHistoryOfChangesBoardDto) {
    return 'This action adds a new historyOfChangesBoard';
  }

  findAll() {
    return `This action returns all historyOfChangesBoard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historyOfChangesBoard`;
  }

  update(id: number, updateHistoryOfChangesBoardDto: UpdateHistoryOfChangesBoardDto) {
    return `This action updates a #${id} historyOfChangesBoard`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyOfChangesBoard`;
  }
}
