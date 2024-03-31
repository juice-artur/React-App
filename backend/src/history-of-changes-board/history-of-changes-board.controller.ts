import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryOfChangesBoardService } from './history-of-changes-board.service';
import { CreateHistoryOfChangesBoardDto } from './dto/create-history-of-changes-board.dto';
import { UpdateHistoryOfChangesBoardDto } from './dto/update-history-of-changes-board.dto';

@Controller('history-of-changes-board')
export class HistoryOfChangesBoardController {
  constructor(private readonly historyOfChangesBoardService: HistoryOfChangesBoardService) {}

  @Post()
  create(@Body() createHistoryOfChangesBoardDto: CreateHistoryOfChangesBoardDto) {
    return this.historyOfChangesBoardService.create(createHistoryOfChangesBoardDto);
  }

  @Get('find-all-by-board-id/:id')
  findAllByBoardId(@Param('id') id: string) {
    return this.historyOfChangesBoardService.findAllByBoardId(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyOfChangesBoardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryOfChangesBoardDto: UpdateHistoryOfChangesBoardDto) {
    return this.historyOfChangesBoardService.update(+id, updateHistoryOfChangesBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyOfChangesBoardService.remove(+id);
  }
}
