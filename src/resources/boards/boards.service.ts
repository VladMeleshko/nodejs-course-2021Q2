import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boards } from '../../entities/board';
import { CreateBoardDto } from '../dto/boards/create-boards.dto';
import { UpdateBoardDto } from '../dto/boards/update-boards.dto';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards) private boardRepository: Repository<Boards>,
    private taskRepository: TasksService,
  ) {}

  async getAll(): Promise<Boards[]> {
    const boards = await this.boardRepository.find();
    return boards;
  }

  async getBoardById(id: string): Promise<Boards> {
    const board = await this.boardRepository.findOneOrFail(id);
    return board;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Boards> {
    const board = await this.boardRepository.create({
      title: createBoardDto.title,
      columns: createBoardDto.columns,
    });
    await this.boardRepository.save(board);
    return board;
  }

  async updateBoard(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Boards> {
    const board = await this.boardRepository.findOneOrFail(id);
    await this.boardRepository.update(id, {
      title: updateBoardDto.title,
      columns: updateBoardDto.columns,
    });
    return board;
  }

  async deleteBoard(id: string): Promise<void> {
    await this.taskRepository.deleteTasksFromBoard(id);
    await this.boardRepository.delete(id);
  }
}
