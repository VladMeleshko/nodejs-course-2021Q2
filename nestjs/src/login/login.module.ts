import { Module, forwardRef } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user';
import { UsersModule } from 'src/resources/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), forwardRef(() => UsersModule)],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
