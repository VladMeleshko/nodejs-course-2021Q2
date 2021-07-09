import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Boards } from '../../entities/board';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from '../dto/boards/create-boards.dto';
import { UpdateBoardDto } from '../dto/boards/update-boards.dto';
import { ValidateSessionGuard } from 'src/login/validate-session.guard';

@Controller('boards')
@UseGuards(ValidateSessionGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async getAll(@Res() res) {
    const boards = await this.boardsService.getAll();
    res.json(boards.map(Boards.toResponse));
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res) {
    try {
      const board = await this.boardsService.getBoardById(id);
      res.json(Boards.toResponse(board));
    } catch {
      res.status(404).send('No such board exist!');
    }
  }

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto, @Res() res) {
    try {
      const board = await this.boardsService.createBoard(createBoardDto);
      res.status(201).json(Boards.toResponse(board));
    } catch {
      res.status(404).send('Board was not created!');
    }
  }

  @Put(':id')
  async update(
    @Body() updateBoardDto: UpdateBoardDto,
    @Param('id') id: string,
    @Res() res,
  ) {
    try {
      const board = await this.boardsService.updateBoard(id, updateBoardDto);
      res.status(200).json(Boards.toResponse(board));
    } catch (e) {
      res.status(404).send(e);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res) {
    try {
      await this.boardsService.deleteBoard(id);
      res.status(204).send('Board has been deleted!');
    } catch (e) {
      res.status(404).send(e);
    }
  }
}
