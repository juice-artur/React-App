import { PartialType } from '@nestjs/swagger';
import { CreateHistoryOfChangesBoardDto } from './create-history-of-changes-board.dto';

export class UpdateHistoryOfChangesBoardDto extends PartialType(CreateHistoryOfChangesBoardDto) {}
