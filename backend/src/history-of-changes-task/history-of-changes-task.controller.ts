import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryOfChangesTaskService } from './history-of-changes-task.service';
import { CreateHistoryOfChangesTaskDto } from './dto/create-history-of-changes-task.dto';
import { UpdateHistoryOfChangesTaskDto } from './dto/update-history-of-changes-task.dto';

@Controller('history-of-changes-task')
export class HistoryOfChangesTaskController {
  constructor(private readonly historyOfChangesTaskService: HistoryOfChangesTaskService) {}

  @Post()
  create(@Body() createHistoryOfChangesTaskDto: CreateHistoryOfChangesTaskDto) {
    return this.historyOfChangesTaskService.create(createHistoryOfChangesTaskDto);
  }


  @Get(':id')
  findAllByTaskId(@Param('id') id: string) {
    return this.historyOfChangesTaskService.findAllByTaskId(+id);
  }
}
