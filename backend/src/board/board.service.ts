import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardService {
  constructor(@InjectRepository(Board)
  private boardRepository: Repository<Board>) { }
  async create(createBoardDto: CreateBoardDto) {
    const newBoard = this.boardRepository.create({ ...createBoardDto });

    const savedBoard = await this.boardRepository.save(newBoard);
    return savedBoard;
  }

  findAll() {
    return this.boardRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    let existboard = await this.boardRepository.findOne({
      where: { id : id},

  });

    if (!existboard) {
        throw new Error(`Board with ID ${id} not found`);
    }

    const changes = [];
    if (updateBoardDto.title !== undefined && updateBoardDto.title !== existboard.title) {
     //   changes.push(`Title changed from "${taskToUpdate.title}" to "${title}"`);
    }

    await this.boardRepository.save({...existboard, title: updateBoardDto.title});
  }

  async remove(id: number) {
    await this.boardRepository.delete(id);
  }
}
