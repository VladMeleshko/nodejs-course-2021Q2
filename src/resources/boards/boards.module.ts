import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Boards } from '../../entities/board';
import { TasksModule } from '../tasks/tasks.module';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Boards]),
    forwardRef(() => TasksModule),
    LoginModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [BoardsService],
})
export class BoardsModule {}
