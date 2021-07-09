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
import { Users } from '../../entities/user';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/users/create-users.dto';
import { UpdateUserDto } from '../dto/users/update-users.dto';
import { ValidateSessionGuard } from 'src/login/validate-session.guard';

@Controller('users')
@UseGuards(ValidateSessionGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(@Res() res) {
    const users = await this.usersService.getAll();
    res.json(users.map(Users.toResponse));
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res) {
    try {
      const user = await this.usersService.getUserById(id);
      res.json(Users.toResponse(user));
    } catch {
      res.status(404).send('No such user exist!');
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      const user = await this.usersService.createUser(createUserDto);
      res.status(201).json(Users.toResponse(user));
    } catch {
      res.status(404).send('User was not created!');
    }
  }

  @Put(':id')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
    @Res() res,
  ) {
    try {
      const user = await this.usersService.updateUser(id, updateUserDto);
      res.status(200).json(Users.toResponse(user));
    } catch (e) {
      res.status(404).send(e);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res) {
    try {
      await this.usersService.deleteUser(id);
      res.status(204).send('User has been deleted!');
    } catch (e) {
      res.status(404).send(e);
    }
  }
}
