import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Users } from 'src/entities/user';
import { CreateLoginDto } from 'src/resources/dto/login/create-login.dto';
import config from 'src/common/config';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async autoriseUser(createLoginDto: CreateLoginDto): Promise<string> {
    const user = await this.userRepository
      .findOneOrFail({ login: createLoginDto.login })
      .catch(() => {
        throw new Error('User not found!');
      });

    const matches = bcrypt.compareSync(createLoginDto.password, user.password);

    if (!matches) throw new Error('Login or password incorrect!');

    const token = jwt.sign(
      {
        userId: user.id,
        login: user.login,
      },
      config.JWT_SECRET_KEY,
      { expiresIn: '24h' },
    );
    return token;
  }
}
