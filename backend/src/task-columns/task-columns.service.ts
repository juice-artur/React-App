import { Injectable } from '@nestjs/common';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';
import { TaskColumn } from './entities/task-column.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/board/entities/board.entity';

@Injectable()
export class TaskColumnsService {
  constructor(
    @InjectRepository(TaskColumn)
    private taskColumnRepository: Repository<TaskColumn>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>) { }

  async create(createTaskColumnDto: CreateTaskColumnDto)  {
    console.log(createTaskColumnDto)
     let Columnn = await  (await this.taskColumnRepository.find())
     .sort((prev:TaskColumn, curr:TaskColumn) => prev.position - curr.position);
     
     let targetPos =  Columnn.length > 0 ? Columnn[0].position / 2 : 1000;
     createTaskColumnDto.position = targetPos;
     const board = await this.boardRepository.findOne({
       where: { id : createTaskColumnDto.board_id }});
     if (!board) {
       throw new Error(`Board with ID ${createTaskColumnDto.board_id} not found`);
     }
     console.log(board);

    const newColumn = this.taskColumnRepository.create({ ...createTaskColumnDto, board: board });
    console.log(newColumn);
    const savedColumn = await this.taskColumnRepository.save(newColumn);
    console.log(savedColumn);
    return savedColumn;
  }

  findAll() {
    return this.taskColumnRepository.find();
  }

  findAllByBoardId(id: number) {
    return this.boardRepository.findOne({relations: ['column'], where: {id:id}})
    .then((board:  Board) => {
      console.log(board);
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

    return await this.taskColumnRepository.save(taskColumnToUpdate);
  }

  async remove(id: number) {
    await this.taskColumnRepository.delete(id);
  }
}
