import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/entities/user';
import { CreateLoginDto } from 'src/resources/dto/login/create-login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async autoriseUser(createLoginDto: CreateLoginDto): Promise<string> {
    const user = await this.userRepository
      .findOneOrFail({ login: createLoginDto.login })
      .catch(() => {
        throw new Error('User not found!');
      });

    const matches = bcrypt.compareSync(createLoginDto.password, user.password);

    if (!matches) throw new Error('Login or password incorrect!');

    const token = this.jwtService.sign({ userId: user.id, login: user.login });
    return token;
  }
}
