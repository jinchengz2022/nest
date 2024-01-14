import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';

import { Permissions } from './entities/permissions.entity';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { LoginDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  @InjectEntityManager()
  entityManager: EntityManager;

  async init() {
    const user1 = new User();
    user1.userName = '张三';
    user1.password = '111111';

    const user2 = new User();
    user2.userName = '李四';
    user2.password = '222222';

    const user3 = new User();
    user3.userName = '王五';
    user3.password = '333333';

    const role1 = new Role();
    role1.name = '管理员';

    const role2 = new Role();
    role2.name = '普通用户';

    const permission1 = new Permissions();
    permission1.name = '新增 aaa';

    const permission2 = new Permissions();
    permission2.name = '修改 aaa';

    const permission3 = new Permissions();
    permission3.name = '删除 aaa';

    const permission4 = new Permissions();
    permission4.name = '查询 aaa';

    const permission5 = new Permissions();
    permission5.name = '新增 bbb';

    const permission6 = new Permissions();
    permission6.name = '修改 bbb';

    const permission7 = new Permissions();
    permission7.name = '删除 bbb';

    const permission8 = new Permissions();
    permission8.name = '查询 bbb';

    role1.permissions = [
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
      permission7,
      permission8,
    ];

    role2.permissions = [permission1, permission2, permission3, permission4];

    user1.roles = [role1];

    user2.roles = [role2];

    await this.entityManager.save(Permissions, [
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
      permission7,
      permission8,
    ]);

    await this.entityManager.save(Role, [role1, role2]);

    await this.entityManager.save(User, [user1, user2]);
  }

  async login(loginDto: LoginDto) {
    const user = await this.entityManager.findOne(User, {
      where: {
        userName: loginDto.userName,
      },
      relations: {
        roles: true,
      },
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.ACCEPTED);
    }

    if (user.password !== loginDto.password) {
      throw new HttpException('password error', HttpStatus.ACCEPTED);
    }

    console.log({ loginDto, user });

    return user;
  }

  async findRolesByIds(roleIds: number[]) {
    return this.entityManager.find(Role, {
      where: {
        id: In(roleIds),
      },
      relations: {
        permissions: true,
      },
    });
  }
}
