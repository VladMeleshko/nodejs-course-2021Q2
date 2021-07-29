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
import { Users } from '../../entities/user';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/users/create-users.dto';
import { UpdateUserDto } from '../dto/users/update-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(@Res() res) {
    const users = await this.usersService.getAll();
    res.send(users.map(Users.toResponse));
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res) {
    try {
      const user = await this.usersService.getUserById(id);
      res.send(Users.toResponse(user));
    } catch {
      res.status(404).send('No such user exist!');
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    const user = await this.usersService.createUser(createUserDto);
    res.status(201).send(Users.toResponse(user));
  }

  @Put(':id')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
    @Res() res,
  ) {
    const user = await this.usersService.updateUser(id, updateUserDto);
    res.status(200).send(Users.toResponse(user));
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res) {
    await this.usersService.deleteUser(id);
    res.status(200).send('User has been deleted!');
  }
}
