import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from '../../entities/user';
import { CreateUserDto } from '../dto/users/create-users.dto';
import { UpdateUserDto } from '../dto/users/update-users.dto';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private taskRepository: TasksService,
  ) {}

  async getAll(): Promise<Users[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserById(id: string): Promise<Users> {
    const user = await this.userRepository.findOneOrFail(id);
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const user = await this.userRepository.create({
      name: createUserDto.name,
      login: createUserDto.login,
      password: bcrypt.hashSync(createUserDto.password, salt),
    });
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    const user = await this.userRepository.findOneOrFail(id);
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    await this.userRepository.update(id, {
      name: updateUserDto.name,
      login: updateUserDto.login,
      password: bcrypt.hashSync(updateUserDto.password, salt),
    });
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.taskRepository.updateUserInTasks(id);
    await this.userRepository.delete(id);
  }
}
