import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from '../../entities/task';
import { CreateTaskDto } from '../dto/tasks/create-tasks.dto';
import { UpdateTaskDto } from '../dto/tasks/update-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks) private taskRepository: Repository<Tasks>,
  ) {}

  async getAll(): Promise<Tasks[]> {
    const tasks = await this.taskRepository.find();
    return tasks;
  }

  async getTaskById(id: string): Promise<Tasks> {
    const task = await this.taskRepository.findOneOrFail(id);
    return task;
  }

  async createTask(
    boardId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<Tasks> {
    const task = await this.taskRepository.create({
      title: createTaskDto.title,
      order: createTaskDto.order,
      description: createTaskDto.description,
      userId: createTaskDto.userId,
      boardId,
      columnId: createTaskDto.columnId,
    });
    await this.taskRepository.save(task);
    return task;
  }

  async updateTask(
    boardId: string,
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Tasks> {
    const task = await this.taskRepository.findOneOrFail(id);
    await this.taskRepository.update(id, {
      title: updateTaskDto.title,
      order: updateTaskDto.order,
      description: updateTaskDto.description,
      userId: updateTaskDto.userId,
      boardId,
      columnId: updateTaskDto.columnId,
    });
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.findOneOrFail(id);
    await this.taskRepository.delete(id);
  }

  async deleteTasksFromBoard(boardId: string): Promise<Tasks[]> {
    await this.taskRepository.delete({ boardId });
    const tasks = await this.taskRepository.find();
    return tasks;
  }

  async updateUserInTasks(userId: string): Promise<Tasks[]> {
    await this.taskRepository.update({ userId }, { userId: null });
    const tasks = await this.taskRepository.find();
    return tasks;
  }
}
