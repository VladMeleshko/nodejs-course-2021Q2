import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Res,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from '../../entities/task';
import { CreateTaskDto } from '../dto/tasks/create-tasks.dto';
import { UpdateTaskDto } from '../dto/tasks/update-tasks.dto';

@Controller('boards/:boardId/tasks/')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAll(@Res() res) {
    const tasks = await this.tasksService.getAll();
    res.send(tasks.map(Tasks.toResponse));
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res) {
    try {
      const task = await this.tasksService.getTaskById(id);
      res.send(Tasks.toResponse(task));
    } catch {
      res.status(404).send('No such task exist!');
    }
  }

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('boardId') boardId: string,
    @Res() res,
  ) {
    const task = await this.tasksService.createTask(boardId, createTaskDto);
    res.status(201).send(Tasks.toResponse(task));
  }

  @Put(':id')
  async update(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: string,
    @Param('boardId') boardId: string,
    @Res() res,
  ) {
    const task = await this.tasksService.updateTask(boardId, id, updateTaskDto);
    res.status(200).send(Tasks.toResponse(task));
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res) {
    await this.tasksService.deleteTask(id);
    res.status(200).send('Task has been deleted!');
  }
}
