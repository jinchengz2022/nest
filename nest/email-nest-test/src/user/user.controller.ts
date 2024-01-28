import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RedisService } from 'src/redis/redis.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject()
  private redisService: RedisService;

  @Post('login')
  async login(@Body() params: LoginDto) {
    const hasRedisEmail = await this.redisService.get(params.email);

    if (!hasRedisEmail) {
      throw new UnauthorizedException('验证码失效');
    }

    if (hasRedisEmail !== params.code) {
      throw new UnauthorizedException('验证码错误');
    }

    const queryRes = await this.userService.findEmail(params);
    console.log({ queryRes });

    if (queryRes) {
      return {
        data: true,
      };
    }

    return {
      data: false,
      message: '邮箱未注册～',
    };
  }
}
