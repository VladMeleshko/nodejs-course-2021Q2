import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from '../../entities/user';
import { TasksModule } from '../tasks/tasks.module';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => TasksModule),
    forwardRef(() => LoginModule),
    LoginModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
