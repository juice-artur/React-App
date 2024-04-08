import { Injectable } from '@nestjs/common';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';
import { TaskColumn } from './entities/task-column.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../board/entities/board.entity';
import { HistoryOfChangesBoard } from '../history-of-changes-board/entities/history-of-changes-board.entity';

@Injectable()
export class TaskColumnsService {
  constructor(
    @InjectRepository(TaskColumn)
    private taskColumnRepository: Repository<TaskColumn>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(HistoryOfChangesBoard)
    private historyOfChangesBoardRepository: Repository<HistoryOfChangesBoard>
    ) { }

  async create(createTaskColumnDto: CreateTaskColumnDto)  {
     let Columnn = await  (await this.taskColumnRepository.find())
     .sort((prev:TaskColumn, curr:TaskColumn) => prev.position - curr.position);
     
     let targetPos =  Columnn.length > 0 ? Columnn[0].position / 2 : 1000;
     createTaskColumnDto.position = targetPos;
     const board = await this.boardRepository.findOne({
       where: { id : createTaskColumnDto.board_id }});
     if (!board) {
       throw new Error(`Board with ID ${createTaskColumnDto.board_id} not found`);
     }

     const item = this.historyOfChangesBoardRepository.create({description : `Column ${createTaskColumnDto.title} was create`, board: board,  created_at: new Date()})
     this.historyOfChangesBoardRepository.save(item)
     

    const newColumn = this.taskColumnRepository.create({ ...createTaskColumnDto, board: board });
    const savedColumn = await this.taskColumnRepository.save(newColumn);

    return savedColumn;
  }

  findAll() {
    return this.taskColumnRepository.find();
  }

  findAllByBoardId(id: number) {
    return this.boardRepository.findOne({relations: ['column'], where: {id:id}})
    .then((board:  Board) => {
      return board.column
    });
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

    taskColumnToUpdate.title = updateTaskColumnDto.title;
    taskColumnToUpdate.description = updateTaskColumnDto.description;
    taskColumnToUpdate.position = updateTaskColumnDto.position;
    taskColumnToUpdate.created_at = updateTaskColumnDto.created_at;
    taskColumnToUpdate.updated_at = updateTaskColumnDto.updated_at;

    const board = await this.boardRepository.findOne({
      where: { id : updateTaskColumnDto.board_id }});
    if (!board) {
      throw new Error(`Board with ID ${updateTaskColumnDto.board_id} not found`);
    }

    const item = this.historyOfChangesBoardRepository.create({description : `Column ${updateTaskColumnDto.title} was edited`, board: board,  created_at: new Date()})
    this.historyOfChangesBoardRepository.save(item)

    return await this.taskColumnRepository.save(taskColumnToUpdate);
  }

  async remove(id: number) {

   const column= await this.taskColumnRepository.findOne({
      where: { id },
      relations: ['board']
    });
    const board = await this.boardRepository.findOne({
      where: { id : column.board.id },
    });
    if (!board) {
      throw new Error(`Board with ID ${column.board.id} not found`);
    }

    const item = this.historyOfChangesBoardRepository.create({description : `Column ${column.title} was deleted`, board: board,  created_at: new Date()})
    this.historyOfChangesBoardRepository.save(item)
    await this.taskColumnRepository.delete(id);
  }
}
