import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { UserService } from './user.service';
import { RegisterUserDto, LoginDto, AdminLoginDto } from './dto/index';
import { RedisService } from 'src/redis/redis.service';
import { EmailService } from 'src/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @Get('initData')
  async initData() {
    return await this.userService.initData();
  }

  @Get('refresh')
  async refresh(@Query('refreshToken') token: string) {
    try {
      const data = this.jwtService.verify(token);

      const user = await this.userService.findUser(data.userId, false);
      const accessToken = this.jwtService.sign(
        {
          userId: user.id,
          userName: user.userName,
          roles: user.roles,
          permissions: user.permissions,
        },
        {
          expiresIn:
            this.configService.get('jwt_access_token_expires_time') || '30m',
        },
      );

      const refreshToken = this.jwtService.sign(
        {
          userId: data.id,
        },
        {
          expiresIn:
            this.configService.get('jwt_access_refreshToken_expires_time') ||
            '7d',
        },
      );

      return { accessToken, refreshToken };
    } catch (error) {
      throw new HttpException(
        'token 已失效，请重新登录',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() login: LoginDto) {
    const vo = await this.userService.login(login, false);

    vo.accessToken = this.jwtService.sign(
      {
        userId: vo.userInfo.id,
        userName: vo.userInfo.username,
        roles: vo.userInfo.roles,
        permissions: vo.userInfo.permissions,
      },
      {
        expiresIn:
          this.configService.get('jwt_access_token_expires_time') || '30m',
      },
    );

    vo.refreshToken = this.jwtService.sign(
      {
        userId: vo.userInfo.id,
      },
      {
        expiresIn:
          this.configService.get('jwt_access_refreshToken_expires_time') ||
          '7d',
      },
    );
    return vo;
  }

  @Post('adminLogin')
  async admidLogin(@Body() adminLogin: AdminLoginDto) {
    return await this.userService.login(adminLogin, true);
  }

  @Get('registryCaptcha')
  async registryCaptcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(address, code, 5 * 60);

    await this.emailService.sendMail({
      to: address,
      subject: '注册验证码',
      html: `<p>您的验证码是${code}</p>`,
    });

    return 'send success';
  }

  @Post('registry')
  async registry(@Body() registerUser: RegisterUserDto) {
    console.log(registerUser);
    return await this.userService.registry(registerUser);
  }
}
