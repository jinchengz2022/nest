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
import { LoginDto } from './dto';
import { LoginUserVo } from './vo/user-login.vo';

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

  async initData() {
    const user1 = new User();
    user1.userName = 'zhangsan';
    user1.password = md5('111111');
    user1.email = 'xxx@xx.com';
    user1.isAdmin = true;
    user1.nickName = '张三';
    user1.phone = '13233323333';

    const user2 = new User();
    user2.userName = 'lisi';
    user2.password = md5('222222');
    user2.email = 'yy@yy.com';
    user2.nickName = '李四';

    const role1 = new Role();
    role1.name = '管理员';

    const role2 = new Role();
    role2.name = '普通用户';

    const permission1 = new Permission();
    permission1.code = 'ccc';
    permission1.description = '访问 ccc 接口';

    const permission2 = new Permission();
    permission2.code = 'ddd';
    permission2.description = '访问 ddd 接口';

    user1.roles = [role1];
    user2.roles = [role2];

    role1.permissions = [permission1, permission2];
    role2.permissions = [permission1];

    await this.permissionResponsitory.save([permission1, permission2]);
    await this.roleResponsitory.save([role1, role2]);
    await this.userResponsitory.save([user1, user2]);
  }

  async findUser(value: number, isAdmin: boolean) {
    const user = await this.userResponsitory.findOne({
      where: {
        id: value,
        isAdmin,
      },
      relations: ['roles', 'roles.permissions'],
    });

    return {
      ...user,
      roles: user.roles.map((item) => item.name),
      permissions: user.roles.reduce((pre, cur) => {
        cur.permissions.forEach((permission) => {
          if (pre.indexOf(permission) === -1) {
            pre.push(permission);
          }
        });
        return pre;
      }, []),
    };
  }

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

  async login(user: LoginDto, isAdmin: boolean) {
    const foundUser = await this.userResponsitory.findOne({
      where: {
        userName: user.userName,
        isAdmin,
      },
      relations: ['roles', 'roles.permissions'],
    });

    if (!foundUser) {
      throw new HttpException(
        '该用户不存在，请前往注册页面',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (md5(user.password) !== foundUser.password) {
      throw new HttpException('密码错误，请重新输入', HttpStatus.BAD_REQUEST);
    }

    const vo = new LoginUserVo();
    vo.userInfo = {
      id: foundUser.id,
      username: foundUser.userName,
      nickName: foundUser.nickName,
      email: foundUser.email,
      phoneNumber: foundUser.phone,
      headPic: foundUser.headPic,
      createTime: foundUser.createTime,
      isAdmin: foundUser.isAdmin,
      isFrozen: foundUser.isFrozen,
      roles: foundUser.roles.map((item) => item.name),
      permissions: foundUser.roles.reduce((pre, cur) => {
        cur.permissions.forEach((permission) => {
          if (pre.indexOf(permission) === -1) {
            pre.push(permission);
          }
        });
        return pre;
      }, []),
    };

    return vo;
  }
}
