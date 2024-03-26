import { Module } from '@nestjs/common';
import { HistoryOfChangesTaskService } from './history-of-changes-task.service';
import { HistoryOfChangesTaskController } from './history-of-changes-task.controller';

@Module({
  controllers: [HistoryOfChangesTaskController],
  providers: [HistoryOfChangesTaskService],
})
export class HistoryOfChangesTaskModule {}
