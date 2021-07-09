import { Module, forwardRef } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user';
import { UsersModule } from 'src/resources/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/common/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService, JwtModule],
})
export class LoginModule {}
