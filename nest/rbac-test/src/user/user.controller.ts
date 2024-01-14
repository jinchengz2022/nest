import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  @Inject(JwtService)
  private jwtService: JwtService;

  constructor(private readonly userService: UserService) {}

  @Get('init')
  async init() {
    await this.userService.init();
    return 'init success';
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const res = await this.userService.login(loginDto);

    const token = this.jwtService.sign({
      user: {
        userName: res.userName,
        roles: res.roles,
      },
    });

    return {
      token,
    };
  }
}
