import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  async findEmail(params: LoginDto) {
    const foundUser = await this.entityManager.findOneBy(User, {
      email: params.email,
    });
    console.log({ foundUser });

    if (foundUser) {
      return true;
    }

    return false;
  }
}
