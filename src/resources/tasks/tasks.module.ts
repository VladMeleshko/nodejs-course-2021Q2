import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Tasks } from '../../entities/task';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks]), LoginModule],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}
