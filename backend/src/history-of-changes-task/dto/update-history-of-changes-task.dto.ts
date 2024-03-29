import { PartialType } from '@nestjs/swagger';
import { CreateHistoryOfChangesTaskDto } from './create-history-of-changes-task.dto';

export class UpdateHistoryOfChangesTaskDto extends PartialType(CreateHistoryOfChangesTaskDto) {}
