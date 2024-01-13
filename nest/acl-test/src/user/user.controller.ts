import { Controller, Get, Post, Body, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('init')
  async initData() {
    await this.userService.init();
    return 'done';
  }

  @Post('login')
  async login(@Body() loginUser: LoginUserDto, @Session() session) {
    const loginRes = await this.userService.login(loginUser);

    session.user = {
      userName: loginRes.userName,
    };

    return 'success';
  }
}
