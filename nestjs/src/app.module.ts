import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './common/ormconfig';
import { UsersModule } from './resources/users/users.module';
import { BoardsModule } from './resources/boards/boards.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    BoardsModule,
    TasksModule,
    LoginModule,
  ],
  controllers: [AppController, LoginController],
  providers: [AppService],
})
export class AppModule {}
