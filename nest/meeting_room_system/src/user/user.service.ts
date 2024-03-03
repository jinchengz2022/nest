import {
  Injectable,
  Logger,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/registerUser.dto';
import { RedisService } from 'src/redis/redis.service';
import { md5 } from '../utils/md5';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(Role)
  private roleResponsitory: Repository<Role>;

  @InjectRepository(Permission)
  private permissionResponsitory: Repository<Permission>;

  @InjectRepository(User)
  private userResponsitory: Repository<User>;

  @Inject(RedisService)
  private redisService: RedisService;

  async registry(user: RegisterUserDto) {
    const captcha = await this.redisService.get(user.email);

    if (!captcha) {
      throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST);
    }

    if (captcha !== user.captcha) {
      throw new HttpException('code error', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.userResponsitory.findOneBy({
      userName: user.userName,
    });

    if (foundUser) {
      throw new HttpException('该用户已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.nickName = user.nickName;
    newUser.userName = user.userName;
    newUser.password = md5(user.password);
    newUser.email = user.email;

    try {
      await this.userResponsitory.save(newUser);
      return 'success';
    } catch (error) {
      this.logger.error(error, UserService);
      return 'error';
    }
  }
}
