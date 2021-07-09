import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateLoginDto } from 'src/resources/dto/login/create-login.dto';
import { LoginService } from './login.service';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  async login(@Res() res, @Body() createLoginDto: CreateLoginDto) {
    try {
      const candidateToken = await this.loginService.autoriseUser(
        createLoginDto,
      );
      res.status(200).json({ token: candidateToken });
    } catch (e) {
      if (e.message === 'Login or password incorrect!') {
        res.status(401).send(e.message);
      } else if (e.message === 'User not found!') {
        res.status(403).send(e.message);
      }
    }
  }
}
